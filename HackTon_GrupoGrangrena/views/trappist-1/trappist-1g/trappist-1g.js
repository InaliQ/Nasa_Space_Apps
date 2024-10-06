document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('.left-section button');

    button.addEventListener('click', function() {
        // Crear un nuevo PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Cargar imágenes y dibujarlas
        const img1 = new Image();
        img1.src = '../../../source/planetas/TRAPPIST-1g.png'; // Ruta de la primera imagen

        const img2 = new Image();
        img2.src = '../../../source/vistas/g_norte.png'; // Ruta de la segunda imagen

        const img3 = new Image();
        img3.src = '../../../source/vistas/g_sur.png'; // Ruta de la tercera imagen

        let imagesLoaded = 0;

        const drawImages = () => {
            // Añadir las imágenes al PDF cuando todas estén cargadas
            if (imagesLoaded === 3) {
                doc.addImage(img1, 'PNG', 10, 10, 50, 50); // Primera imagen
                doc.addImage(img2, 'PNG', 70, 10, 50, 50); // Segunda imagen
                doc.addImage(img3, 'PNG', 130, 10, 50, 50); // Tercera imagen

                // Estilos del PDF
                doc.setFont("helvetica", "bold");
                doc.setTextColor(40, 55, 71); // Color para los títulos

                // Título
                doc.setFontSize(18);
                doc.text("Exoplaneta: TRAPPIST-1c", 10, 70); // Cambié la posición para que no se sobreponga a las imágenes

                // Línea separadora
                doc.setDrawColor(40, 55, 71);
                doc.line(10, 73, 200, 73); // Dibuja una línea horizontal

                doc.setFont("helvetica", "normal");
                doc.setTextColor(80); // Color para el texto normal

                // Información General
                doc.setFontSize(14);
                doc.text("Información General:", 10, 80);
                doc.setFontSize(12);
                doc.text("TRAPPIST-1c es un planeta extrasolar que forma parte de un sistema planetario ", 10, 90);
                doc.text("formado por al menos siete planetas.", 10, 95);
                doc.text("Orbita la estrella enana ultrafría denominada TRAPPIST-1 aproximadamente a 40 años luz", 10, 100);
                doc.text(" en la constelación de Acuario.", 10, 105);

                // Línea separadora
                doc.line(10, 110, 200, 110);

                // Características
                doc.setFontSize(14);
                doc.text("Características:", 10, 115);
                doc.setFontSize(12);
                doc.text("Masa: 0,08 ± 0,009 MJ", 10, 125);
                doc.text("Radio: 0,117 ± 0,004 m", 10, 135);
                doc.text("Constelación: Acuario", 10, 145);
                doc.text("Temperatura: 2550 ± 55,0 K", 10, 155);
                doc.text("Distancia de la estrella: 12,1 ± 0,4 pc", 10, 165);

                // Línea separadora
                doc.line(10, 170, 200, 170);

                // Footer
                doc.setFontSize(10);
                doc.setFont("helvetica", "italic");
                doc.text("Fuente: Datos de exoplanetas", 10, 175);

                // Guardar el PDF
                doc.save("exoplaneta_trappist-1c.pdf");
            }
        };

        img1.onload = () => {
            imagesLoaded++;
            drawImages();
        };

        img2.onload = () => {
            imagesLoaded++;
            drawImages();
        };

        img3.onload = () => {
            imagesLoaded++;
            drawImages();
        };
    });
});
