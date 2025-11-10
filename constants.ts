import type { Section } from './types';

export const MODULE_STRUCTURE: Section[] = [
  {
    id: 'introduccion',
    title: 'Introducción',
    topic: 'Bienvenida al Curso de Calidad de Software',
    content: `
      <div class="space-y-6">

        <div class="relative p-8 bg-white rounded-xl shadow-md text-center overflow-hidden animate-fade-in-up">
          <img src="https://storage.googleapis.com/efor-static/CNT%20firma/Gemini_Generated_Image_7e70sr7e70sr7e70%20(1).png" alt="Banner de bienvenida" class="absolute top-0 left-0 w-full h-full object-cover opacity-20"/>
          <div class="relative z-10">
            <h2 class="text-3xl font-extrabold text-indigo-700 mb-4">¡Bienvenido al Centro de Aprendizaje de Calidad de Software!</h2>
            <p class="text-lg text-slate-600 max-w-3xl mx-auto">
              Este módulo interactivo está diseñado para guiarte a través de los principios fundamentales y las prácticas avanzadas que definen el software de alta calidad. Desde los estándares de codificación hasta las métricas y las pruebas, aquí encontrarás el conocimiento necesario para construir aplicaciones robustas, mantenibles y eficientes.
            </p>
          </div>
        </div>
        
        
        <div class="grid md:grid-cols-2 gap-6"> 
          
          <div class="bg-white p-6 rounded-lg shadow-sm animate-fade-in-up delay-200">
              <h3 class="font-bold text-xl text-slate-800 mb-4">Video Introductorio</h3>
              <div class="relative w-full overflow-hidden rounded-lg" style="padding-top: 56.25%;">
                  <iframe 
                      class="absolute top-0 left-0 w-full h-full" 
                      src="https://www.youtube.com/embed/RwZrH3_b1pY" 
                      title="Video introductorio" 
                      frameborder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowfullscreen>
                  </iframe>
              </div>
          </div>
          
          <div class="space-y-6">
              
              <div class="bg-white p-6 rounded-lg shadow-sm animate-fade-in-up delay-300">
                <h3 class="font-bold text-xl text-slate-800 mb-2">¿Qué Aprenderás?</h3>
                <p class="text-slate-600">Explora los módulos utilizando el menú de navegación para cubrir temas como <strong>Principios SOLID</strong>, <strong>Métricas de Calidad</strong>, <strong>Técnicas de Testing</strong> y la cultura <strong>DevOps</strong>. Cada sección está diseñada para ser concisa y educativa.</p>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm animate-fade-in-up delay-400">
                <h3 class="font-bold text-xl text-slate-800 mb-2">Pon a Prueba tu Conocimiento</h3>
                <p class="text-slate-600">Utiliza el botón <strong>"Prueba tu conocimiento"</strong> en la cabecera para generar un desafío interactivo. Estos cuestionarios, creados por IA, te permitirán evaluar tu comprensión y reforzar los conceptos clave aprendidos.</p>
              </div>

              <div class="bg-white p-6 rounded-lg shadow-sm animate-fade-in-up delay-500">
                <h3 class="font-bold text-xl text-slate-800 mb-2">📋 Feedback de Calidad</h3>
                <p class="text-slate-600">¿Ves el ícono en la esquina? Úsalo para abrir nuestro formulario de "Feedback de Calidad". Puedes ingresar la URL de un sitio y evaluarlo en áreas clave como <strong>usabilidad</strong>, <strong>rendimiento</strong> y <strong>diseño visual</strong> para generar un reporte.</p>
              </div>
              </div>
          
        </div> <div class="text-center pt-4 animate-fade-in-up delay-600">
            <p class="text-slate-500">Usa el menú desplegable <strong>"Software Quality."</strong> en la cabecera o la barra lateral para comenzar tu viaje de aprendizaje. ¡Éxito!</p>
        </div>

      </div>
    `,
  },
  {
    id: 'estandares',
    title: 'Estándares y Calidad',
    topic: 'Estándares de Programación y Calidad del Código',
    content: `
      <div class="space-y-10">
        <img src="https://storage.googleapis.com/efor-static/CNT%20firma/1.png" alt="Imagen representando estándares y calidad de código" class="w-full h-64 object-cover rounded-xl shadow-md mb-6 animate-fade-in-up" />
        <p class="text-lg animate-fade-in-up delay-200">Los estándares de programación son reglas y convenciones que definen buenas prácticas en la escritura de código fuente, con el objetivo de lograr claridad, mantenibilidad, legibilidad y seguridad. La calidad del código se refiere a la medida en que el código es comprensible, testeable, eficiente y libre de defectos.</p>
        
        <div class="p-6 bg-white rounded-xl shadow-md animate-fade-in-up delay-200">
          <h3 class="text-xl font-bold text-indigo-700 mb-4">Beneficios de Aplicar Estándares</h3>
          <ul class="list-disc list-inside space-y-2 text-slate-700">
            <li>Mejora la colaboración entre desarrolladores.</li>
            <li>Facilita la revisión de código (Code Review).</li>
            <li>Reduce errores y vulnerabilidades.</li>
            <li>Asegura la continuidad del proyecto en el tiempo.</li>
            <li>Aumenta la productividad del equipo.</li>
            <li>Facilita la incorporación de nuevos miembros.</li>
          </ul>
        </div>

        <div class="animate-fade-in-up delay-300">
          <h3 class="text-2xl font-bold text-slate-800 mb-4">Principios de Código Limpio (Clean Code)</h3>
          <p class="mb-6">Desarrollados por Robert C. Martin, estos principios enfatizan la legibilidad, simplicidad y claridad del código.</p>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal-500 animate-fade-in-up delay-400">
              <h4 class="font-bold text-lg text-teal-800">Nombres Descriptivos</h4>
              <p class="mt-2 text-sm">Utilizar identificadores que revelen la intención y función del elemento. Deben ser claros, precisos y evitar abreviaturas confusas.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal-500 animate-fade-in-up delay-500">
              <h4 class="font-bold text-lg text-teal-800">Funciones Pequeñas</h4>
              <p class="mt-2 text-sm">Crear funciones que realicen una única tarea. Idealmente, deben ser cortas (menos de 20 líneas) y tener un nivel de abstracción consistente.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal-500 animate-fade-in-up delay-600">
              <h4 class="font-bold text-lg text-teal-800">Evitar Duplicación (DRY)</h4>
              <p class="mt-2 text-sm">Seguir el principio "Don't Repeat Yourself". La duplicación de código aumenta el riesgo de errores y dificulta el mantenimiento.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal-500 animate-fade-in-up delay-400">
              <h4 class="font-bold text-lg text-teal-800">Separación de Responsabilidades</h4>
              <p class="mt-2 text-sm">Cada clase o módulo debe tener una única razón para cambiar (Principio de Responsabilidad Única).</p>
            </div>
             <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal-500 animate-fade-in-up delay-500">
              <h4 class="font-bold text-lg text-teal-800">Comentarios Útiles y Escasos</h4>
              <p class="mt-2 text-sm">El código debe ser autoexplicativo. Los comentarios deben explicar el "por qué", no el "qué", evitando redundancia.</p>
            </div>
          </div>
        </div>

        <div class="animate-fade-in-up delay-400">
          <h3 class="text-2xl font-bold text-slate-800 mb-4">Principios SOLID</h3>
           <div class="space-y-3">
              <details class="bg-white p-4 rounded-lg shadow-sm cursor-pointer group transition-all duration-300 hover:shadow-md animate-fade-in-up delay-500">
                <summary class="flex justify-between items-center font-semibold text-slate-800 list-none">
                    <span><strong>S - Responsabilidad Única</strong> (Single Responsibility)</span>
                    <span class="text-indigo-500 transform transition-transform duration-200 group-open:rotate-180">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </span>
                </summary>
                <div class="mt-3 text-slate-600 border-t pt-3">Una clase debe tener una sola razón para cambiar. Esto significa que cada clase debe tener una única responsabilidad o propósito dentro del sistema.</div>
              </details>
              <details class="bg-white p-4 rounded-lg shadow-sm cursor-pointer group transition-all duration-300 hover:shadow-md animate-fade-in-up delay-600">
                <summary class="flex justify-between items-center font-semibold text-slate-800 list-none">
                    <span><strong>O - Abierto/Cerrado</strong> (Open/Closed)</span>
                    <span class="text-indigo-500 transform transition-transform duration-200 group-open:rotate-180">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </span>
                </summary>
                <div class="mt-3 text-slate-600 border-t pt-3">Las entidades de software (clases, módulos, funciones, etc.) deben estar abiertas para su extensión, pero cerradas para su modificación. Se deben poder añadir nuevas funcionalidades sin cambiar el código existente.</div>
              </details>
              <details class="bg-white p-4 rounded-lg shadow-sm cursor-pointer group transition-all duration-300 hover:shadow-md animate-fade-in-up" style="animation-delay: 700ms;">
                <summary class="flex justify-between items-center font-semibold text-slate-800 list-none">
                    <span><strong>L - Sustitución de Liskov</strong> (Liskov Substitution)</span>
                    <span class="text-indigo-500 transform transition-transform duration-200 group-open:rotate-180">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </span>
                </summary>
                <div class="mt-3 text-slate-600 border-t pt-3">Los objetos de una clase derivada deben poder sustituir a los de la clase base sin afectar la corrección del programa. Las subclases deben ser sustituibles por sus clases base.</div>
              </details>
              <details class="bg-white p-4 rounded-lg shadow-sm cursor-pointer group transition-all duration-300 hover:shadow-md animate-fade-in-up" style="animation-delay: 800ms;">
                <summary class="flex justify-between items-center font-semibold text-slate-800 list-none">
                    <span><strong>I - Segregación de Interfaces</strong> (Interface Segregation)</span>
                    <span class="text-indigo-500 transform transition-transform duration-200 group-open:rotate-180">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </span>
                </summary>
                <div class="mt-3 text-slate-600 border-t pt-3">Es mejor tener muchas interfaces específicas para cada cliente que una sola interfaz general. Ningún cliente debe ser forzado a depender de métodos que no utiliza.</div>
              </details>
              <details class="bg-white p-4 rounded-lg shadow-sm cursor-pointer group transition-all duration-300 hover:shadow-md animate-fade-in-up" style="animation-delay: 900ms;">
                <summary class="flex justify-between items-center font-semibold text-slate-800 list-none">
                    <span><strong>D - Inversión de Dependencias</strong> (Dependency Inversion)</span>
                    <span class="text-indigo-500 transform transition-transform duration-200 group-open:rotate-180">
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </span>
                </summary>
                <div class="mt-3 text-slate-600 border-t pt-3">Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones. Además, las abstracciones no deben depender de los detalles, sino que los detalles deben depender de las abstracciones.</div>
              </details>
           </div>
        </div>
      </div>
    `,
  },
  {
    id: 'metricas',
    title: 'Métricas y Evaluación',
    topic: 'Métricas y Evaluación de Calidad del Software',
    content: `
      <div class="space-y-6">
        <img src="https://storage.googleapis.com/efor-static/CNT%20firma/2.png" alt="Imagen representando métricas y evaluación de software" class="w-full h-64 object-cover rounded-xl shadow-md mb-6 animate-fade-in-up" />
        <p class="text-lg animate-fade-in-up delay-100">Las métricas de calidad de software son medidas cuantitativas que permiten evaluar distintos aspectos del producto, proceso y proyecto. Proporcionan datos objetivos para tomar decisiones, identificar defectos y mejorar procesos.</p>

        <div class="p-6 bg-white rounded-xl shadow-md animate-fade-in-up delay-200">
          <h3 class="text-xl font-bold text-indigo-700 mb-4">Tipos de Métricas de Calidad</h3>
          <div class="grid md:grid-cols-3 gap-4 text-center">
            <div class="bg-indigo-50 p-4 rounded-lg animate-fade-in-up delay-300">
              <h4 class="font-bold">De Producto</h4>
              <p class="text-sm">Analizan características internas: complejidad, defectos, tamaño del código.</p>
            </div>
            <div class="bg-indigo-50 p-4 rounded-lg animate-fade-in-up delay-400">
              <h4 class="font-bold">De Proceso</h4>
              <p class="text-sm">Miden eficiencia en el desarrollo: tiempo, costos, productividad.</p>
            </div>
             <div class="bg-indigo-50 p-4 rounded-lg animate-fade-in-up delay-500">
              <h4 class="font-bold">De Proyecto</h4>
              <p class="text-sm">Evalúan aspectos de gestión: planificación, cumplimiento de cronogramas.</p>
            </div>
          </div>
        </div>
        
        <div class="animate-fade-in-up delay-300">
          <h3 class="text-2xl font-bold text-slate-800 mb-4">Métricas Clave</h3>
          <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg shadow-sm animate-fade-in-up delay-400">
              <h4 class="font-bold">Densidad de Defectos</h4>
              <p class="text-sm">Número de defectos por unidad de tamaño del código (e.g., KLOC). Valores más bajos indican mejor calidad.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-sm animate-fade-in-up delay-500">
              <h4 class="font-bold">Complejidad Ciclomática</h4>
              <p class="text-sm">Mide el número de caminos linealmente independientes en un módulo. Alta complejidad implica menor mantenibilidad.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-sm animate-fade-in-up delay-600">
              <h4 class="font-bold">Cobertura de Pruebas</h4>
              <p class="text-sm">Porcentaje de líneas, funciones o rutas del código ejecutadas por pruebas automatizadas. Un objetivo típico es > 80%.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow-sm animate-fade-in-up" style="animation-delay: 700ms;">
              <h4 class="font-bold">Índice de Mantenibilidad</h4>
              <p class="text-sm">Combinación de métricas que evalúa la facilidad con que el código puede ser modificado. Escala: 0-100.</p>
            </div>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: 'pruebas',
    title: 'Pruebas de Software',
    topic: 'Pruebas de Software y Técnicas de Testing',
    content: `
      <div class="space-y-6">
        <img src="https://storage.googleapis.com/efor-static/CNT%20firma/3.png" alt="Imagen representando pruebas de software" class="w-full h-64 object-cover rounded-xl shadow-md mb-6 animate-fade-in-up" />
        <p class="text-lg animate-fade-in-up delay-100">Las pruebas de software son un conjunto de actividades diseñadas para identificar errores, verificar el cumplimiento de requisitos y asegurar la calidad de una aplicación antes de su liberación.</p>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="p-6 bg-white rounded-xl shadow-md animate-fade-in-up delay-200">
            <h3 class="text-xl font-bold text-indigo-700 mb-4">Pruebas Funcionales</h3>
            <p>Basadas en requisitos y comportamientos esperados del sistema. Evalúan si el software cumple con las especificaciones.</p>
          </div>
          <div class="p-6 bg-white rounded-xl shadow-md animate-fade-in-up delay-300">
            <h3 class="text-xl font-bold text-indigo-700 mb-4">Pruebas No Funcionales</h3>
            <p>Enfocadas en aspectos como rendimiento, seguridad, usabilidad, entre otras características cualitativas.</p>
          </div>
        </div>

        <div class="animate-fade-in-up delay-400">
          <h3 class="text-2xl font-bold text-slate-800 mb-4">Técnicas de Testing</h3>
          <div class="space-y-3">
            <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500 animate-fade-in-up delay-500"><strong>Caja Negra:</strong> Se prueba la funcionalidad sin conocer el código interno. Se enfoca en entradas y salidas.</div>
            <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500 animate-fade-in-up delay-600"><strong>Caja Blanca:</strong> Se evalúa el flujo interno del código, analizando rutas de ejecución, cobertura y estructura.</div>
            <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500 animate-fade-in-up" style="animation-delay: 700ms;"><strong>TDD (Test Driven Development):</strong> Desarrollo guiado por pruebas donde se escriben primero los tests y luego el código que los satisface.</div>
            <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500 animate-fade-in-up" style="animation-delay: 800ms;"><strong>BDD (Behavior Driven Development):</strong> Pruebas basadas en comportamiento utilizando lenguaje natural, facilitando la colaboración.</div>
          </div>
        </div>
      </div>
    `,
  },
  {
    id: 'devops',
    title: 'Automatización y DevOps',
    topic: 'Automatización y DevOps en Calidad de Software',
    content: `
       <div class="space-y-6">
        
        <p class="text-lg animate-fade-in-up delay-100">DevOps es una metodología que combina el desarrollo (Dev) y las operaciones (Ops) para acortar el ciclo de vida del software, aumentar la frecuencia de entregas y mejorar la calidad.</p>
        
        <div class="p-6 bg-white rounded-xl shadow-md animate-fade-in-up delay-200">
          <h3 class="text-xl font-bold text-indigo-700 mb-4">Conceptos Clave en DevOps</h3>
          <ul class="list-none space-y-4">
            <li class="animate-fade-in-up delay-300"><strong class="font-semibold text-teal-700">Integración Continua (CI):</strong> Práctica de integrar cambios frecuentemente en un repositorio central, con ejecución automática de pruebas y validaciones.</li>
            <li class="animate-fade-in-up delay-400"><strong class="font-semibold text-teal-700">Entrega Continua (CD):</strong> Automatización de la entrega de cambios al entorno de producción o staging, asegurando que cada versión esté lista para ser desplegada.</li>
            <li class="animate-fade-in-up delay-500"><strong class="font-semibold text-teal-700">Testing Continuo:</strong> Automatización de pruebas en cada commit, merge o despliegue para detectar defectos tempranamente y prevenir regresiones.</li>
          </ul>
        </div>

        <div class="animate-fade-in-up delay-300">
          <h3 class="text-2xl font-bold text-slate-800 mb-4">Pipeline DevOps</h3>
          <p class="mb-4">Un pipeline de DevOps es una secuencia de pasos automatizados que incluye:</p>
          <div class="flex flex-wrap gap-2 text-sm">
            <span class="bg-slate-200 text-slate-800 font-medium px-3 py-1 rounded-full animate-fade-in-up delay-400">Build (Compilación)</span>
            <span class="bg-slate-200 text-slate-800 font-medium px-3 py-1 rounded-full animate-fade-in-up delay-500">Test (Pruebas)</span>
            <span class="bg-slate-200 text-slate-800 font-medium px-3 py-1 rounded-full animate-fade-in-up delay-600">Release (Lanzamiento)</span>
            <span class="bg-slate-200 text-slate-800 font-medium px-3 py-1 rounded-full animate-fade-in-up" style="animation-delay: 700ms;">Deploy (Despliegue)</span>
            <span class="bg-slate-200 text-slate-800 font-medium px-3 py-1 rounded-full animate-fade-in-up" style="animation-delay: 800ms;">Monitor (Monitoreo)</span>
          </div>
        </div>
        
        <div class="p-6 bg-white rounded-xl shadow-md animate-fade-in-up delay-400">
          <h3 class="text-xl font-bold text-indigo-700 mb-4">Beneficios de la Automatización</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="animate-fade-in-up delay-500"><strong>Detección Temprana:</strong> Identificación de problemas en las primeras etapas del desarrollo.</div>
            <div class="animate-fade-in-up delay-500"><strong>Consistencia:</strong> Aplicación uniforme de estándares de calidad en todo el código.</div>
            <div class="animate-fade-in-up delay-600"><strong>Eficiencia:</strong> Reducción del tiempo dedicado a tareas repetitivas.</div>
            <div class="animate-fade-in-up delay-600"><strong>Confianza:</strong> Mayor seguridad en cada despliegue, reduciendo el riesgo de incidentes.</div>
          </div>
        </div>
      </div>
    `,
  },
];


export const EVALUATION_CRITERIA: { key: string, label: string }[] = [
    { key: 'usability', label: 'Facilidad de Uso' },
    { key: 'performance', label: 'Rendimiento' },
    { key: 'accessibility', label: 'Accesibilidad' },
    { key: 'visualDesign', label: 'Diseño Visual' },
    { key: 'contentClarity', label: 'Claridad del Contenido' },
];
