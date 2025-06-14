import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import IssueBookForm from '../components/Librarian/IssueBookForm';

const IssueBookEmployeePage: React.FC = () => {
  const [employeeDepartment, setEmployeeDepartment] = useState('');
  
  const [userDetails, setUserDetails] = useState({
    name: '',
    id: '',
    phone: '',
    department: ''
  });

  const [bookSearch, setBookSearch] = useState({
    bookId: '',
    bookName: ''
  });

  const [bookDetails, setBookDetails] = useState({
    bookTitle: '',
    bookId: '',
    bookISBN: '',
    authorName: '',
    shelfNumber: '',
    category: ''
  });

  const [issueDetails, setIssueDetails] = useState({
    issueDate: '',
    returnDate: ''
  });

  // Mock Data 
  const mockEmployees = [
    {
      id: '6',
      name: 'A employee',
      phone: '+91 6451853222',
      department: '2'
    },
    {
      id: '12',
      name: 'B employee',
      phone: '+91 9876543210',
      department: '3'
    }
  ];

  const mockBooks = [
    {
      bookId: '611552',
      bookTitle: 'NCERT Science class 9',
      bookISBN: '978-0-321-14653-0',
      authorName: 'Author Name',
      shelfNumber: '18',
      category: 'Non Fiction'
    },
    {
      bookId: '712345',
      bookTitle: 'Java Programming',
      bookISBN: '978-0-123-45678-9',
      authorName: 'Java Guru',
      shelfNumber: '25',
      category: 'Educational'
    }
  ];

  // Handlers
  const handleSearchUser = async () => {
    try {
      const response = await fetch('/api/library/issue-book/employee/search-employee...', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userDetails.id,
          name: userDetails.name
        })
      });

      if (!response.ok) throw new Error('API response not OK');

      const data = await response.json();
      if (data && data.employee) {
        setUserDetails({
          name: data.employee.name,
          id: data.employee.id,
          phone: data.employee.phone,
          department: data.employee.department
        });
        setEmployeeDepartment(data.employee.department);
        console.log('Employee found via API:', data.employee);
      } else {
        console.warn('API returned no employee, using mock data...');
        searchUserWithMock();
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      searchUserWithMock();
    }
  };

  const searchUserWithMock = () => {
    const foundEmployee = mockEmployees.find(
      (emp) =>
        emp.id === userDetails.id ||
        emp.name.toLowerCase() === userDetails.name.toLowerCase()
    );
    if (foundEmployee) {
      setUserDetails({
        name: foundEmployee.name,
        id: foundEmployee.id,
        phone: foundEmployee.phone,
        department: foundEmployee.department
      });
      setEmployeeDepartment(foundEmployee.department);
      console.log('Employee found (mock):', foundEmployee);
    } else {
      alert('No employee found.');
    }
  };

  const handleSearchBook = async () => {
    try {
      const response = await fetch('/api/library/issue-book/employee/search-book...', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId: bookSearch.bookId,
          bookName: bookSearch.bookName
        })
      });

      if (!response.ok) throw new Error('API response not OK');

      const data = await response.json();
      if (data && data.book) {
        setBookDetails({
          bookTitle: data.book.bookTitle,
          bookId: data.book.bookId,
          bookISBN: data.book.bookISBN,
          authorName: data.book.authorName,
          shelfNumber: data.book.shelfNumber,
          category: data.book.category
        });
        console.log('Book found via API:', data.book);
      } else {
        console.warn('API returned no book, using mock data...');
        searchBookWithMock();
      }
    } catch (error) {
      console.error('Error fetching book:', error);
      searchBookWithMock();
    }
  };

  const searchBookWithMock = () => {
    const foundBook = mockBooks.find(
      (book) =>
        book.bookId === bookSearch.bookId ||
        book.bookTitle.toLowerCase() === bookSearch.bookName.toLowerCase()
    );
    if (foundBook) {
      setBookDetails({
        bookTitle: foundBook.bookTitle,
        bookId: foundBook.bookId,
        bookISBN: foundBook.bookISBN,
        authorName: foundBook.authorName,
        shelfNumber: foundBook.shelfNumber,
        category: foundBook.category
      });
      console.log('Book found (mock):', foundBook);
    } else {
      alert('No book found.');
    }
  };

  const handleReset = () => {
    setEmployeeDepartment('');
    setUserDetails({ name: '', id: '', phone: '', department: '' });
    setBookSearch({ bookId: '', bookName: '' });
    setBookDetails({
      bookTitle: '',
      bookId: '',
      bookISBN: '',
      authorName: '',
      shelfNumber: '',
      category: ''
    });
    setIssueDetails({ issueDate: '', returnDate: '' });
  };

  const handleIssueBook = async () => {
    try {
      const response = await fetch('/api/library/issue-book/employee/issue....', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeDetails: userDetails,
          bookDetails,
          issueDetails
        })
      });

      if (!response.ok) throw new Error('API response not OK');

      const data = await response.json();
      console.log('Book issued via API:', data);
      alert('Book issued successfully!');
    } catch (error) {
      console.error('Error issuing book:', error);
      console.warn('Falling back to mock issue...');
      alert('Book issued successfully (mock)!');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 mt-4 p-4">
        <div className="relative flex w-full justify-center z-10 text-center mt-4 mb-4">
            <SearchBar />
          </div>

        <div>
          <IssueBookForm
            userType="Employee"
            userDetails={userDetails}
            setUserDetails={(value) => setUserDetails(prev => ({ ...prev, ...value }))}
            bookSearch={bookSearch}
            setBookSearch={setBookSearch}
            bookDetails={bookDetails}
            setBookDetails={(value) => setBookDetails(prev => ({ ...prev, ...value }))}
            issueDetails={issueDetails}
            setIssueDetails={(value) => setIssueDetails(prev => ({ ...prev, ...value }))}
            onSearchUser={handleSearchUser}
            onSearchBook={handleSearchBook}
            onReset={handleReset}
            onIssueBook={handleIssueBook}
            
            userFields={[
              { key: 'name', label: 'Employee Name', type: 'text', placeholder: 'Enter Employee Name' },
              { key: 'id', label: 'Employee ID', type: 'text', placeholder: 'Enter Employee ID' },
              { key: 'phone', label: 'Phone Number', type: 'text', placeholder: 'Enter Phone Number' },
              { key: 'department', label: 'Department', type: 'text', placeholder: 'Enter Department' }
            ]}
            userSearchFields={[
              {
                key: 'id',
                label: 'Search By Employee ID',
                type: 'text',
                value: userDetails.id,
                onChange: (val) =>
                  setUserDetails({ ...userDetails, id: val }),
                placeholder: 'Search by ID',
                searchable: true
              },
              {
                key: 'name',
                label: 'Search by Employee Name',
                type: 'text',
                value: userDetails.name,
                onChange: (val) =>
                  setUserDetails({ ...userDetails, name: val }),
                placeholder: 'Search by Name',
                searchable: true
              }
            ]}
            studentClass={''}
            setStudentClass={() => {}}
          />
        </div>
      </div>
    </div>
  );
};export default IssueBookEmployeePage;
