import React, { useState } from 'react';
import Sidebar from '@/components/SidebarStudent';
import SearchBar from '@/components/SearchBar';
import IssueBookForm from '../components/Librarian/IssueBookForm';

const IssueBookStudent: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    studentName: '',
    studentClass: '',
    studentSection: '',
    rollNumber: ''
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
  const mockStudents = [
    {
      rollNumber: '2',
      studentName: 'A Student',
      studentClass: '6',
      studentSection: 'A'
    },
    {
      rollNumber: '5',
      studentName: 'B Student',
      studentClass: '7',
      studentSection: 'B'
    }
  ];

  const mockBooks = [
    {
      bookId: '9001',
      bookTitle: 'Mathematics Grade 9',
      bookISBN: '978-0-123-45678-0',
      authorName: 'Author Math',
      shelfNumber: '5',
      category: 'Educational'
    },
    {
      bookId: '9002',
      bookTitle: 'Physics Fundamentals',
      bookISBN: '978-0-987-65432-1',
      authorName: 'Author Physics',
      shelfNumber: '10',
      category: 'Science'
    }
  ];

  const handleSearchUser = async () => {
    try {
      const response = await fetch('/api/library/issue-book/student/search-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rollNumber: userDetails.rollNumber,
          studentName: userDetails.studentName
        })
      });

      if (!response.ok) throw new Error('API response not OK');

      const data = await response.json();
      if (data && data.student) {
        setUserDetails({
          studentName: data.student.studentName,
          studentClass: data.student.studentClass,
          studentSection: data.student.studentSection,
          rollNumber: data.student.rollNumber
        });
        console.log('Student found via API:', data.student);
      } else {
        searchUserWithMock();
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      searchUserWithMock();
    }
  };

  const searchUserWithMock = () => {
    const foundStudent = mockStudents.find(
      (stu) =>
        stu.rollNumber === userDetails.rollNumber ||
        stu.studentName.toLowerCase() === userDetails.studentName.toLowerCase()
    );
    if (foundStudent) {
      setUserDetails({
        studentName: foundStudent.studentName,
        studentClass: foundStudent.studentClass,
        studentSection: foundStudent.studentSection,
        rollNumber: foundStudent.rollNumber
      });
    } else {
      alert('No student found.');
    }
  };

  const handleSearchBook = async () => {
    try {
      const response = await fetch('/api/library/issue-book/student/search-book', {
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
      } else {
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
    } else {
      alert('No book found.');
    }
  };

  const handleReset = () => {
    setUserDetails({
      studentName: '',
      studentClass: '',
      studentSection: '',
      rollNumber: ''
    });
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
      const response = await fetch('/api/library/issue-book/student/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentDetails: userDetails,
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
      alert('Book issued successfully (mock)!');
    }
  };

  return (
    <div className="flex font-poppins">
      <Sidebar />
      <div className="flex-1 mt-4 p-4">
        <div className="relative flex w-full justify-center z-10 text-center mt-8 mb-2">
            <SearchBar />
          </div>

        <div>
          <IssueBookForm
            userType="Student"
            userDetails={userDetails}
            setUserDetails={(value: Record<string, string>) => setUserDetails(prev => ({ ...prev, ...value }))}
            bookSearch={bookSearch}
            setBookSearch={setBookSearch}
            bookDetails={bookDetails}
            setBookDetails={(value: Record<string, string>) => setBookDetails(prev => ({ ...prev, ...value }))}
            issueDetails={issueDetails}
            setIssueDetails={(value: Record<string, string>) => setIssueDetails(prev => ({ ...prev, ...value }))}
            onSearchUser={handleSearchUser}
            onSearchBook={handleSearchBook}
            onReset={handleReset}
            onIssueBook={handleIssueBook}
            userFields={[
              { key: 'studentName', label: 'Student Name', placeholder: 'Enter Student Name', type: 'text' },
              { 
                key: 'studentClass', 
                label: 'Class', 
                placeholder: 'Select Class', 
                type: 'dropdown', 
                options: Array.from({ length: 12 }, (_, i) => (i + 1).toString())
              },
              { 
                key: 'studentSection', 
                label: 'Section', 
                placeholder: 'Select Section', 
                type: 'dropdown', 
                options: ['A', 'B', 'C', 'D']
              },
              { key: 'rollNumber', label: 'Roll Number', placeholder: 'Enter Roll Number', type: 'text' }
            ]}
            userSearchFields={[
              {
                key: 'rollNumber',
                label: 'Search by Roll Number',
                type: 'text',
                value: userDetails.rollNumber,
                onChange: (val) => setUserDetails({ ...userDetails, rollNumber: val }),
                placeholder: 'Search by Roll Number',
                searchable: true
              },
              {
                key: 'studentName',
                label: 'Search by Name',
                type: 'text',
                value: userDetails.studentName,
                onChange: (val) => setUserDetails({ ...userDetails, studentName: val }),
                placeholder: 'Search by Name',
                searchable: true,
              }
            ]}
            studentClass={userDetails.studentClass}
            setStudentClass={(val: string) => setUserDetails({ ...userDetails, studentClass: val })}
          />
        </div>
      </div>
    </div>
  );
};

export default IssueBookStudent;
