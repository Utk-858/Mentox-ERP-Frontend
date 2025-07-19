import React, { useReducer, useMemo, useEffect, useRef } from 'react';
import { Download, PlusCircle, Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { format, parse } from 'date-fns';
import { salaryData as initialData } from '../data/mockData';
// --- THIS IS THE CORRECTED IMPORT PATH ---
import { useSalary } from '../context/SalaryContext'; 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Helper component for each row in the form
const EditableField = ({ label, value, onValueChange, onRemove, isDefault = false }: {
    label: string,
    value: number,
    onValueChange: (value: number) => void,
    onRemove?: () => void,
    isDefault?: boolean
}) => (
    <div className="flex items-center gap-4 py-2 border-b">
        <span className="flex-1 text-gray-600">{label}</span>
        <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">₹</span>
            <input
                type="number"
                value={value}
                onChange={(e) => onValueChange(parseFloat(e.target.value) || 0)}
                className="w-32 p-1 text-right font-semibold text-gray-800 bg-gray-50 rounded-md border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
        </div>
        {!isDefault && onRemove && (
             <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700">
                <Trash2 size={16} />
            </button>
        )}
    </div>
);

// Define types for our reducer state and actions
type Field = { id: string; label: string; value: number; isDefault: boolean };
type State = {
    employeeName: string;
    employeeId: string;
    department: string;
    designation: string;
    joiningDate: string;
    payPeriod: string;
    paidDays: number;
    earnings: Field[];
    deductions: Field[];
};
type Action =
    | { type: 'SET_SLIP_DATA'; payload: State }
    | { type: 'UPDATE_EARNING'; payload: { id: string; value: number } }
    | { type: 'UPDATE_DEDUCTION'; payload: { id: string; value: number } }
    | { type: 'ADD_EARNING'; payload: Field }
    | { type: 'ADD_DEDUCTION'; payload: Field }
    | { type: 'REMOVE_EARNING'; payload: { id: string } }
    | { type: 'REMOVE_DEDUCTION'; payload: { id: string } };

// Generic earning/deduction structure
const genericSlipStructure = {
    joiningDate: '01/07/2025',
    paidDays: 31,
    earnings: [ { id: 'basic', label: 'Basic Pay', value: 80000, isDefault: true }, { id: 'hra', label: 'House Rent Allowance', value: 32000, isDefault: true }, { id: 'da', label: 'D.A.', value: 5000, isDefault: true }, { id: 'cca', label: 'C.C. Allowance', value: 10000, isDefault: true }, ],
    deductions: [ { id: 'pf', label: 'Provident Fund', value: 6500, isDefault: true }, { id: 'esi', label: 'E.S.I', value: 0, isDefault: true }, { id: 'nps', label: 'NPS Subscription', value: 0, isDefault: true }, { id: 'tds', label: 'Income Tax (TDS)', value: 15000, isDefault: true }, ]
};

// The reducer function to handle all state updates
const slipReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_SLIP_DATA': return action.payload;
        case 'UPDATE_EARNING': return { ...state, earnings: state.earnings.map(e => e.id === action.payload.id ? { ...e, value: action.payload.value } : e) };
        case 'UPDATE_DEDUCTION': return { ...state, deductions: state.deductions.map(d => d.id === action.payload.id ? { ...d, value: action.payload.value } : d) };
        case 'ADD_EARNING': return {...state, earnings: [...state.earnings, action.payload]};
        case 'ADD_DEDUCTION': return {...state, deductions: [...state.deductions, action.payload]};
        case 'REMOVE_EARNING': return {...state, earnings: state.earnings.filter(e => e.id !== action.payload.id)};
        case 'REMOVE_DEDUCTION': return {...state, deductions: state.deductions.filter(d => d.id !== action.payload.id)};
        default: return state;
    }
};

const EditableSalarySlipPage: React.FC = () => {
    const { employeeId, month } = useParams<{ employeeId: string; month: string }>();
    const { updateSalarySlip } = useSalary();
    const slipRef = useRef<HTMLDivElement>(null);

    if (!employeeId || !month) {
        return <div className="p-8 text-center text-red-500">Error: Employee ID or month is missing from the URL.</div>;
    }
    
    const initialReducerState: State = { employeeId: '', payPeriod: '', employeeName: '', department: '', designation: '', joiningDate: '', paidDays: 0, earnings: [], deductions: [] };
    const [state, dispatch] = useReducer(slipReducer, initialReducerState);

    useEffect(() => {
        const employeeDetails = initialData.find(e => e.employeeId === employeeId);
        if (employeeDetails) {
            const displayDate = parse(month.replace('-', ' '), 'MMMM yyyy', new Date());
            const formattedMonth = format(displayDate, 'MMMM, yyyy');
            const employeeData: State = { 
                ...genericSlipStructure,
                employeeName: employeeDetails.employeeName,
                employeeId: employeeDetails.employeeId,
                department: employeeDetails.department,
                designation: employeeDetails.role,
                payPeriod: formattedMonth, 
            };
            dispatch({ type: 'SET_SLIP_DATA', payload: employeeData });
        }
    }, [employeeId, month]);

    const { grossEarnings, totalDeductions, netSalary } = useMemo(() => {
        const grossEarnings = state.earnings.reduce((sum, item) => sum + item.value, 0);
        const totalDeductions = state.deductions.reduce((sum, item) => sum + item.value, 0);
        const netSalary = grossEarnings - totalDeductions;
        return { grossEarnings, totalDeductions, netSalary };
    }, [state.earnings, state.deductions]);
    
    const handleAddField = (type: 'earning' | 'deduction') => {
        const label = prompt(`Enter a label for the new ${type}:`);
        if (label) {
            const newField: Field = { id: `custom_${new Date().getTime()}`, label, value: 0, isDefault: false };
            if (type === 'earning') { dispatch({ type: 'ADD_EARNING', payload: newField }); } 
            else { dispatch({ type: 'ADD_DEDUCTION', payload: newField }); }
        }
    };

    const handleDownloadPdf = () => {
        const input = slipRef.current;
        if (!input) return;

        html2canvas(input, { scale: 2 })
            .then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`Salary-Slip-${state.employeeName}-${state.payPeriod}.pdf`);
            });
    };

    const handleSaveChanges = () => {
        const monthString = state.payPeriod.replace(', ', '-');
        updateSalarySlip(employeeId, monthString, state);
    };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-full font-poppins">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Salary Slip</h1>
          <p className="text-sm text-gray-500 mt-1">Salary Slip for {state.employeeName} - {state.payPeriod}</p>
        </div>
        <div className="flex items-center gap-4">
            <button onClick={handleDownloadPdf} className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50">
                <Download size={16} />
                <span>Download PDF</span>
            </button>
            <button onClick={handleSaveChanges} className="flex items-center gap-2 bg-[#702DFF] text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90">
                <span>Save Changes</span>
            </button>
        </div>
      </div>

      <div ref={slipRef} className="p-6 sm:p-8 rounded-xl bg-white">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Hemish Morgan School</h2>
            <p className="text-gray-500">Salary Slip for {state.payPeriod}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm border-b pb-6 mb-6">
            <div>
                <p><strong>Salary Slip for {state.payPeriod}</strong></p>
                <p><strong>Department:</strong> {state.department}</p>
                <p><strong>Designation:</strong> {state.designation}</p>
                <p><strong>Employee ID:</strong> {state.employeeId}</p>
                <p><strong>Joining Date:</strong> {state.joiningDate}</p>
            </div>
            <div className="text-left md:text-right">
                <p><strong>Pay Period:</strong> {state.payPeriod}</p>
                <p><strong>Salary Pay Date:</strong> 31/07/2025</p>
                <p><strong>Total Working Days:</strong> 31</p>
                <p><strong>Days Paid:</strong> {state.paidDays}</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            <div>
                <h3 className="text-lg font-bold text-green-600 mb-4">Earnings</h3>
                <div className="space-y-2">
                    {state.earnings.map(earning => (
                        <EditableField key={earning.id} label={earning.label} value={earning.value} onValueChange={(value) => dispatch({ type: 'UPDATE_EARNING', payload: { id: earning.id, value }})} onRemove={() => dispatch({ type: 'REMOVE_EARNING', payload: { id: earning.id }})} isDefault={earning.isDefault}/>
                    ))}
                </div>
                <button onClick={() => handleAddField('earning')} className="flex items-center gap-2 text-sm text-blue-600 font-medium mt-4 hover:text-blue-800">
                    <PlusCircle size={16}/>
                    <span>Add Earning</span>
                </button>
                <div className="flex justify-between items-center mt-4 pt-4 border-t-2">
                    <span className="font-bold text-gray-800">Gross Earnings</span>
                    <span className="font-bold text-gray-900">₹{grossEarnings.toLocaleString('en-IN')}</span>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold text-red-600 mb-4">Deductions</h3>
                <div className="space-y-2">
                     {state.deductions.map(deduction => (
                        <EditableField key={deduction.id} label={deduction.label} value={deduction.value} onValueChange={(value) => dispatch({ type: 'UPDATE_DEDUCTION', payload: { id: deduction.id, value }})} onRemove={() => dispatch({ type: 'REMOVE_DEDUCTION', payload: { id: deduction.id }})} isDefault={deduction.isDefault}/>
                    ))}
                </div>
                 <button onClick={() => handleAddField('deduction')} className="flex items-center gap-2 text-sm text-blue-600 font-medium mt-4 hover:text-blue-800">
                    <PlusCircle size={16}/>
                    <span>Add Deduction</span>
                </button>
                <div className="flex justify-between items-center mt-4 pt-4 border-t-2">
                    <span className="font-bold text-gray-800">Total Deductions</span>
                    <span className="font-bold text-gray-900">₹{totalDeductions.toLocaleString('en-IN')}</span>
                </div>
            </div>
        </div>
        <div className="mt-8 pt-6 border-t">
            <div className="bg-purple-100 text-purple-900 p-4 rounded-lg flex justify-between items-center">
                <span className="text-xl font-bold">NET SALARY PAYABLE</span>
                <span className="text-2xl font-extrabold">₹{netSalary.toLocaleString('en-IN')}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditableSalarySlipPage;