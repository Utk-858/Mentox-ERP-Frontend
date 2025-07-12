// src/features/libraryms/Libroutes.tsx
import React, { Suspense, lazy } from 'react'; // Import lazy and Suspense if using them internally
import { Routes, Route } from 'react-router-dom'; // <== IMPORTANT: Import Routes here!

// Use lazy loading for Library components for better performance
// It's good practice to lazy load components that are not immediately needed.
const LibraryDashboard = lazy(() => import('./pages/library-dashboard'));
const IssuedBooks = lazy(() => import('./pages/issued-books'));
const ReservedBooks = lazy(() => import('./pages/reserved-books'));
const BookDetails = lazy(() => import('./pages/book-details'));
const IssueBookStudent = lazy(() => import('./pages/issueBookStudent'));
const IssueBookEmployee = lazy(() => import('./pages/issueBookEmployee'));
const LibraryLibrarian = lazy(() => import('./pages/libraryLibrarian'));
const LibraryConfiguration = lazy(() => import('./pages/libraryConfiguration'));
const LibraryPolicy = lazy(() => import('./pages/LibraryPolicy'));
const ReturnBook = lazy(() => import('./pages/returnBook'));
const UpdateBook = lazy(() => import('./pages/UpdateBook'));
const EditDetails = lazy(() => import('./pages/edit-details'));
const AddBook = lazy(() => import('./pages/addBook'));


const Libraryroutes = () => {
  return (
    // You should wrap internal routes in their own <Suspense> for lazy loading
    <Suspense fallback={<div>Loading Library Section...</div>}>
      <Routes> {/* <== THIS IS THE CRUCIAL ADDITION! */}
        {/*
          Paths here are RELATIVE to the parent route's path "/Library".
          - path="/" will match "/Library"
          - path="issued-books" will match "/Library/issued-books"
          - path="book-details/:id" will match "/Library/book-details/:id"
          Notice no leading slashes for child routes, unless you want them to be absolute again (which defeats the purpose of nesting/wildcard)
        */}
        <Route path="/" element={<LibraryDashboard />} />
        <Route path="/issued-books" element={<IssuedBooks />} />
        <Route path="/reserved-books" element={<ReservedBooks />} />
        <Route path="/book-details/:id" element={<BookDetails />} />
        <Route path="/librarian/issue-book-student" element={<IssueBookStudent />} />
        <Route path="/librarian/issue-book-employee" element={<IssueBookEmployee />} />
        <Route path="/librarian" element={<LibraryLibrarian />} /> {/* Grouped librarian routes */}
        <Route path="/librarian/library-configuration" element={<LibraryConfiguration />} />
        <Route path="/librarian/library-policy" element={<LibraryPolicy />} />
        <Route path="/librarian/return-book/:id" element={<ReturnBook />} />
        <Route path="/librarian/update-book/:id" element={<UpdateBook />} />
        <Route path="/librarian/edit-details/:id" element={<EditDetails />} />
        <Route path="/librarian/add-book" element={<AddBook />} />

        {/* Catch-all route for any undefined paths within /Library/* */}
        {/* Place this last in your internal Routes */}
        <Route path="*" element={<div>Library Sub-Page Not Found</div>} />
      </Routes>
    </Suspense>
  );
};

export default Libraryroutes;