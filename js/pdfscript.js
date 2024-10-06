  // URL del PDF
  const url = '../certificados/Certificado_Seguridad_y_privacidad.pdf';

  // Carga el PDF utilizando PDF.js
  const pdfjsLib = window['pdfjs-dist/build/pdf'];
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
  
  const loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(pdf => {
      // Cargar la primera página del PDF
      pdf.getPage(1).then(page => {
          const canvas = document.getElementById('pdf-render');
          const context = canvas.getContext('2d');
          
          // Establece la escala para que el PDF se vea bien
          const viewport = page.getViewport({ scale: 1.5 });
          canvas.height = viewport.height;
          canvas.width = viewport.width;
  
          // Renderiza el PDF en el canvas
          const renderContext = {
              canvasContext: context,
              viewport: viewport
          };
          page.render(renderContext);
      });
  }).catch(error => {
      console.error('Error al cargar el PDF: ', error);
  });