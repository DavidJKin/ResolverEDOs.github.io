document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const coefA = document.getElementById('coefA');
    const coefB = document.getElementById('coefB');
    const coefC = document.getElementById('coefC');
    const resolverBtn = document.getElementById('resolverBtn');
    const panelSolucion = document.getElementById('panel-solucion');
    
    // Función que se ejecuta al hacer clic en el botón
    function resolverEcuacion() {
        // Leer valores
        const a = parseFloat(coefA.value);
        const b = parseFloat(coefB.value);
        const c = parseFloat(coefC.value);

        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            panelSolucion.innerHTML = `<p style="color: red;">Por favor, ingrese todos los coeficientes.</p>`;
            return;
        }

        if (a === 0) {
            panelSolucion.innerHTML = `<p style="color: red;">Error: El coeficiente 'a' no puede ser cero en una ecuación de segundo orden.</p>`;
            return;
        }

        // --- Inicia la construcción del HTML de la solución ---
        let htmlSolucion = '<div class="paso-a-paso">';

        // PASO 1: Ecuación Característica
        const bSigno = b >= 0 ? '+' : '-';
        const cSigno = c >= 0 ? '+' : '-';
        htmlSolucion += `<h4>Paso 1: Ecuación Característica</h4>`;
        htmlSolucion += `<p>La ecuación característica es de la forma \\( ar^2 + br + c = 0 \\):</p>`;
        htmlSolucion += `<p>\\( ${a}r^2 ${bSigno} ${Math.abs(b)}r ${cSigno} ${Math.abs(c)} = 0 \\)</p>`;
        htmlSolucion += '</div>';

        // PASO 2: Calcular el Discriminante
        const discriminante = b * b - 4 * a * c;
        htmlSolucion += '<div class="paso-a-paso">';
        htmlSolucion += `<h4>Paso 2: Calcular el Discriminante (Δ)</h4>`;
        htmlSolucion += `<p>\\( \\Delta = b^2 - 4ac \\)</p>`;
        htmlSolucion += `<p>\\( \\Delta = (${b})^2 - 4(${a})(${c}) = ${discriminante} \\)</p>`;
        htmlSolucion += '</div>';
        
        // PASO 3: Analizar el discriminante y encontrar las raíces
        htmlSolucion += '<div class="paso-a-paso">';
        htmlSolucion += `<h4>Paso 3: Encontrar las Raíces de la Ecuación</h4>`;

        let tipoCaso, formulaCaso, solucionGeneral;

        if (discriminante > 0) {
            tipoCaso = "Caso 1: Raíces Reales y Distintas (Δ > 0)";
            const r1 = (-b + Math.sqrt(discriminante)) / (2 * a);
            const r2 = (-b - Math.sqrt(discriminante)) / (2 * a);
            htmlSolucion += `<p>Las raíces son \\( r_1 = ${r1.toFixed(2)} \\) y \\( r_2 = ${r2.toFixed(2)} \\)</p>`;
            formulaCaso = `La fórmula para este caso es: \\( y(x) = C_1 e^{r_1 x} + C_2 e^{r_2 x} \\)`;
            solucionGeneral = `y(x) = C_1 e^{${r1.toFixed(2)}x} + C_2 e^{${r2.toFixed(2)}x}`;

        } else if (discriminante === 0) {
            tipoCaso = "Caso 2: Raíces Reales e Iguales (Δ = 0)";
            const r = -b / (2 * a);
            htmlSolucion += `<p>La raíz es \\( r = ${r.toFixed(2)} \\) (raíz repetida)</p>`;
            formulaCaso = `La fórmula para este caso es: \\( y(x) = (C_1 + C_2 x) e^{rx} \\)`;
            solucionGeneral = `y(x) = (C_1 + C_2 x) e^{${r.toFixed(2)}x}`;

        } else { // discriminante < 0
            tipoCaso = "Caso 3: Raíces Complejas Conjugadas (Δ < 0)";
            const alpha = -b / (2 * a);
            const beta = Math.sqrt(-discriminante) / (2 * a);
            htmlSolucion += `<p>Las raíces son \\( r = \\alpha \\pm \\beta i \\), donde \\( \\alpha = ${alpha.toFixed(2)} \\) y \\( \\beta = ${beta.toFixed(2)} \\)</p>`;
            formulaCaso = `La fórmula es: \\( y(x) = e^{\\alpha x} (C_1 \\cos(\\beta x) + C_2 \\sin(\\beta x)) \\)`;
            solucionGeneral = `y(x) = e^{${alpha.toFixed(2)}x} (C_1 \\cos(${beta.toFixed(2)}x) + C_2 \\sin(${beta.toFixed(2)}x))`;
        }
        
        htmlSolucion += '</div>';

        // PASO FINAL: Mostrar la solución
        htmlSolucion += '<div class="solucion-final">';
        htmlSolucion += `<h4>Paso 4: Construir la Solución General</h4>`;
        htmlSolucion += `<p><b>${tipoCaso}</b></p>`;
        htmlSolucion += `<p class="formula-caso">${formulaCaso}</p>`;
        htmlSolucion += `<p>Sustituyendo los valores de las raíces, la <strong>Solución General</strong> es:</p>`;
        htmlSolucion += `<h3>\\( ${solucionGeneral} \\)</h3>`;
        htmlSolucion += '</div>';

        // Actualizar el panel de solución con todo el HTML generado
        panelSolucion.innerHTML = htmlSolucion;
        
        // Pedir a MathJax que renderice todas las fórmulas nuevas
        MathJax.typeset();
    }
    
    // Asignar la función al evento 'click' del botón
    resolverBtn.addEventListener('click', resolverEcuacion);
});