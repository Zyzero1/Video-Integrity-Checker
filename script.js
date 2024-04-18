async function generateVideoHash(file, password) {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function calculateHash() {
    const fileInput = document.getElementById('videoFile');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file.');
        return;
    }

    generateVideoHash(file)
        .then(hash => {
            const hashResultDiv = document.getElementById('hashResult');
            hashResultDiv.textContent = `The hash of the selected video file is: ${hash}`;
            document.getElementById('hash').value = hash;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while calculating the hash.');
        });
}

async function checkIntegrity() {
    const fileInput = document.getElementById('videoFile');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file.');
        return;
    }

    const password = document.getElementById('password').value;
    const hashValue = document.getElementById('hash').value;

    const calculatedHash = await generateVideoHash(file, password);

    const integrityResultDiv = document.getElementById('integrityResult');
    if (calculatedHash === hashValue) {
        integrityResultDiv.textContent = 'The video file has not been modified.';
    } else {
        integrityResultDiv.textContent = 'The video file has been modified.';
    }
}