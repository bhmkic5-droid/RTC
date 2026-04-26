function saveComplaint() {
    // 1. Get the Hidden ID field (if editing an existing one)
    const id = document.getElementById('complaintId').value;
    
    // 2. Capture values from the inputs
    const capturedName = document.getElementById('customerName').value.trim();
    const capturedPhone = document.getElementById('customerPhone').value.trim();
    const capturedEmail = document.getElementById('customerEmail').value.trim();
    const capturedProduct = document.getElementById('productType').value;
    const capturedSerial = document.getElementById('serialNumber').value.trim();
    const capturedDesc = document.getElementById('description').value.trim();
    const capturedPriority = document.getElementById('priority').value;

    // --- DEBUG LOGS ---
    console.log("--- ATTEMPTING TO SAVE ---");
    console.log("Name Found:", capturedName);
    console.log("Product Found:", capturedProduct);
    // ------------------

    // 3. Validation - Ensure mandatory fields aren't empty
    if (!capturedName || !capturedPhone || !capturedSerial || !capturedDesc || !capturedProduct) {
        showToast('Please fill all required fields!', 'error');
        console.error("Save failed: Missing required fields");
        return;
    }

    if (id) {
        // UPDATE EXISTING
        const index = complaints.findIndex(c => c.id == id);
        if (index !== -1) {
            complaints[index] = { 
                ...complaints[index], 
                customerName: capturedName,
                customerPhone: capturedPhone,
                customerEmail: capturedEmail,
                productType: capturedProduct,
                serialNumber: capturedSerial,
                description: capturedDesc,
                priority: capturedPriority
            };
            showToast('Complaint updated successfully', 'success');
        }
    } else {
        // CREATE NEW
        const newComplaint = {
            id: nextId++,
            customerName: capturedName, // Use the captured variable
            customerPhone: capturedPhone,
            customerEmail: capturedEmail,
            productType: capturedProduct,
            serialNumber: capturedSerial,
            description: capturedDesc,
            priority: capturedPriority,
            status: 'pending',
            createdAt: new Date().toISOString(),
            remarks: '',
            resolvedAt: null
        };
        complaints.push(newComplaint);
        showToast(`Complaint #${newComplaint.id} registered!`, 'success');
    }

    saveData();
    refreshUI();
    closeModal();
}