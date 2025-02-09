const uploadBox = document.getElementById('upload-box');
        const uploadFields = document.getElementById('upload-fields');

        uploadBox.addEventListener('click', function(event) {  
            uploadFields.style.display = 'flex';
            event.preventDefault(); 
        });

    
        let isVisible = false; 
        
        uploadBox.addEventListener('click', function(event) {
            event.preventDefault(); 
        
            isVisible = !isVisible; 
        
            if (isVisible) {
                uploadFields.style.display = 'flex';
            } else {
                uploadFields.style.display = 'none';
            }
        });
        
      

        uploadBox.addEventListener('click', function(event) {
            event.preventDefault();
        
            if (uploadFields.style.display === 'none') {
                uploadFields.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'; 
                uploadFields.style.opacity = 0; 
                uploadFields.style.transform = 'translateY(-20px)'; 
        
                uploadFields.style.display = 'flex'; 
        
                setTimeout(() => {
                    uploadFields.style.opacity = 1; 
                    uploadFields.style.transform = 'translateY(0)'; 
                }, 10); 
            } else {
                uploadFields.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
                uploadFields.style.opacity = 1;
                uploadFields.style.transform = 'translateY(0)';
        
                setTimeout(() => {
                    uploadFields.style.opacity = 0;
                    uploadFields.style.transform = 'translateY(-20px)';
                }, 10);
        
                setTimeout(() => {
                    uploadFields.style.display = 'none'; 
                }, 500); 
        
            }
        });

