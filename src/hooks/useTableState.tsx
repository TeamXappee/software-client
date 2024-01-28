import { useState, useCallback } from "react";

function useDocumentState(initialState = {}) {
  // State to track the documents
  const [documents, setDocuments] = useState(initialState);

  // Function to update a specific document's data
  const updateDocument = useCallback((id: string, newData: any) => {
    setDocuments((prevDocuments: any) => ({
      ...prevDocuments,
      [id]: { ...prevDocuments[id], ...newData },
    }));
  }, []);

  // Function to reset the state to initial
  const resetDocuments = useCallback(() => {
    setDocuments(initialState);
  }, [initialState]);

  // Function to submit the changes (e.g., to a backend server)
  const submitChanges = useCallback(async () => {
    try {
      // Replace with your actual submission logic
      // e.g., an HTTP request to your backend
      console.log("Submitting changes:", documents);
      // After successful submission, you can reset the documents or handle as needed
    } catch (error) {
      console.error("Error submitting changes:", error);
      // Handle error
    }
  }, [documents]);

  return {
    documents,
    updateDocument,
    resetDocuments,
    submitChanges,
  };
}

export default useDocumentState;
