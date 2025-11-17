document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const coefA = document.getElementById('coefA');
    const coefB = document.getElementById('coefB');
    const coefC = document.getElementById('coefC');
    const resolverBtn = document.getElementById('resolverBtn');
    const panelSolucion = document.getElementById('panel-solucion');

    /**
     * Esta función limpia los números.
     * Ejemplo: 3.00 -> 3
     * Ejemplo: -0.50 -> -0.5
     * Ejemplo: 0.62 -> 0.62
     */
    function limpiarNumero(num) {
        const numRedondeado = num.toFixed(2);
        return parseFloat(numRedondeado);
    }
    
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
        const disc_f = limpiarNumero(discriminante); // Discriminante formateado
        
        htmlSolucion += '<div class="paso-a-paso">';
        htmlSolucion += `<h4>Paso 2: Calcular el Discriminante (Δ)</h4>`;
        htmlSolucion += `<p>\\( \\Delta = b^2 - 4ac \\)</p>`;
        htmlSolucion += `<p>\\( \\Delta = (${b})^2 - 4(${a})(${c}) = ${disc_f} \\)</p>`;
        htmlSolucion += '</div>';
        
        // PASO 3: Analizar el discriminante y encontrar las raíces
        htmlSolucion += '<div class="paso-a-paso">';
        htmlSolucion += `<h4>Paso 3: Encontrar las Raíces de la Ecuación</h4>`;

        let tipoCaso, formulaCaso, solucionGeneral;

        if (discriminante > 0) {
            tipoCaso = "Caso 1: Raíces Reales y Distintas (Δ > 0)";
            const r1 = (-b + Math.sqrt(discriminante)) / (2 * a);
            const r2 = (-b - Math.sqrt(discriminante)) / (2 * a);
            
            const r1_f = limpiarNumero(r1);
            const r2_f = limpiarNumero(r2);
            
            // --- CORRECCIÓN AQUÍ: Se escaparon \\frac, \\pm, \\sqrt, \\Delta ---
            htmlSolucion += `<p>Usamos la fórmula cuadrática: \\( r = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} \\)</p>`;
            htmlSolucion += `<p>\\( r_1 = \\frac{-(${b}) + \\sqrt{${disc_f}}}{2(${a})} = ${r1_f} \\)</p>`;
            htmlSolucion += `<p>\\( r_2 = \\frac{-(${b}) - \\sqrt{${disc_f}}}{2(${a})} = ${r2_f} \\)</p>`;
            
            formulaCaso = `La fórmula para este caso es: \\( y = C_1 e^{r_1 x} + C_2 e^{r_2 x} \\)`;
            solucionGeneral = `y = C_1 e^{${r1_f}x} + C_2 e^{${r2_f}x}`;

        } else if (discriminante === 0) {
            tipoCaso = "Caso 2: Raíces Reales e Iguales (Δ = 0)";
            const r = -b / (2 * a);
            
            const r_f = limpiarNumero(r);

            // --- CORRECCIÓN AQUÍ: Se escapó \\frac ---
            htmlSolucion += `<p>Usamos la fórmula para raíz repetida (ya que \\(\\Delta=0\\)): \\( r = \\frac{-b}{2a} \\)</p>`;
            htmlSolucion += `<p>\\( r = \\frac{-(${b})}{2(${a})} = ${r_f} \\) (raíz repetida)</p>`;

            formulaCaso = `La fórmula para este caso es: \\( y = C_1 e^{rx} + C_2 x e^{rx} \\)`;
            solucionGeneral = `y = C_1 e^{${r_f}x} + C_2 x e^{${r_f}x}`;

        } else { // discriminante < 0
            tipoCaso = "Caso 3: Raíces Complejas Conjugadas (Δ < 0)";
            const alpha = -b / (2 * a);
            const beta = Math.sqrt(-discriminante) / (2 * a);

            const alpha_f = limpiarNumero(alpha);
            const beta_f = limpiarNumero(beta);
            const disc_neg_f = limpiarNumero(-discriminante); // Para mostrarlo bonito

            // --- CORRECCIÓN AQUÍ: Se escaparon \\alpha, \\pm, \\beta, \\frac, \\sqrt, \\Delta ---
            htmlSolucion += `<p>Las raíces son \\( r = \\alpha \\pm \\beta i \\), donde calculamos:</p>`;
            htmlSolucion += `<p>\\( \\alpha = \\frac{-b}{2a} = \\frac{-(${b})}{2(${a})} = ${alpha_f} \\)</p>`;
            htmlSolucion += `<p>\\( \\beta = \\frac{\\sqrt{-\\Delta}}{2a} = \\frac{\\sqrt{${disc_neg_f}}}{2(${a})} = ${beta_f} \\)</p>`;

            formulaCaso = `La fórmula es: \\( y = e^{\\alpha x} (C_1 \\cos(\\beta x) + C_2 \\sin(\\beta x)) \\)`;
            solucionGeneral = `y = e^{${alpha_f}x} (C_1 \\cos(${beta_f}x) + C_2 \\sin(${beta_f}x))`;
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
