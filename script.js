window.addEventListener('load', function() {
    var iframe = document.querySelector('iframe');
    var doc = iframe.contentDocument || iframe.contentWindow.document;
  
    var overlay = doc.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Semi-transparent white
    overlay.style.zIndex = '1000'; // Ensure it's above everything else
  
    doc.body.appendChild(overlay);
  });
  