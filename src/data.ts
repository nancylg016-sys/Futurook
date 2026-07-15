import { University, VocationalQuestion } from "./types";

export const UNIVERSITIES: University[] = [
  {
    id: "uees",
    name: "Universidad Evangélica de El Salvador",
    abbreviation: "UEES",
    accentColor: "#0F4C81", // Blue accented yellow/sun burst, but we can style with its logo
    description: "Reconocida líder en la formación académica en ciencias de la salud, medicina y odontología en El Salvador. Destaca por su alta vocación de servicio y valores cristianos.",
    website: "https://www.uees.edu.sv",
    programs: [
      {
        id: "uees-medicina",
        name: "Doctorado en Medicina",
        category: "salud",
        description: "Forma profesionales médicos integrales capaces de responder a los retos de salud pública con ética, rigor científico y alta empatía.",
        duration: "7 años",
        modality: "Presencial",
        skillsLearned: ["Diagnóstico clínico", "Atención primaria de salud", "Cirugía general básica", "Ética médica y bioética"],
        fieldHighlights: ["Laboratorio de simulación clínica avanzado", "Convenios con hospitales nacionales", "Prácticas clínicas desde años tempranos"]
      },
      {
        id: "uees-odontologia",
        name: "Doctorado en Cirugía Dental",
        category: "salud",
        description: "Enfoque clínico completo para el cuidado, prevención y tratamiento de la salud bucodental utilizando tecnología de punta.",
        duration: "6 años",
        modality: "Presencial",
        skillsLearned: ["Operatoria dental y estética", "Ortodoncia preventiva", "Cirugía oral menor", "Odontopediatría"],
        fieldHighlights: ["Clínicas odontológicas universitarias propias", "Terapia con simulación 3D", "Atención social en comunidades vulnerables"]
      },
      {
        id: "uees-psicologia",
        name: "Licenciatura en Psicología",
        category: "social",
        description: "Estudio del comportamiento humano enfocado en la salud mental, intervención clínica y el bienestar de los salvadoreños.",
        duration: "5 años",
        modality: "Presencial",
        skillsLearned: ["Evaluación psicométrica", "Terapia cognitivo-conductual", "Psicología evolutiva", "Intervención comunitaria"],
        fieldHighlights: ["Gabinete psicopedagógico integrado", "Talleres prácticos de resolución de conflictos", "Prácticas profesionales en centros educativos y ONG"]
      }
    ]
  },
  {
    id: "ujmd",
    name: "Universidad Dr. José Matías Delgado",
    abbreviation: "UJMD",
    accentColor: "#333333", // Distinct shield, elegant lines
    description: "Referente nacional en creatividad, innovación, diseño y leyes. Promueve el desarrollo integral y el emprendimiento como motor social de El Salvador.",
    website: "https://www.ujmd.edu.sv",
    programs: [
      {
        id: "ujmd-diseno",
        name: "Licenciatura en Diseño Gráfico",
        category: "creativo",
        description: "Desarrolla la conceptualización visual, dirección de arte, branding estratégico y medios interactivos para la industria digital y publicitaria.",
        duration: "5 años",
        modality: "Presencial",
        skillsLearned: ["Identidad de marca y branding", "Ilustración digital y modelado 3D", "Diseño UX/UI", "Fotografía y producción audiovisual"],
        fieldHighlights: ["Talleres de diseño Macintosh equipados con suites de última generación", "Festivales anuales de creatividad con jurados internacionales", "Proyectos reales aplicados con pymes salvadoreñas"]
      },
      {
        id: "ujmd-arquitectura",
        name: "Arquitectura",
        category: "creativo",
        description: "Planificación, diseño y construcción de espacios habitables sostenibles que se integran armoniosamente con el entorno social y urbano.",
        duration: "5 años",
        modality: "Presencial",
        skillsLearned: ["Diseño arquitectónico y volumétrico", "Planificación territorial y urbana", "Cálculo estructural básico", "Sustentabilidad ambiental en obras"],
        fieldHighlights: ["Estudios de diseño abiertos con luz natural", "Uso de software BIM de vanguardia (Revit, Archicad)", "Viajes de estudio y análisis patrimonial"]
      },
      {
        id: "ujmd-comunicaciones",
        name: "Licenciatura en Ciencias de la Comunicación",
        category: "social",
        description: "Prepara líderes en periodismo digital, relaciones públicas, producción de televisión/radio y comunicación estratégica empresarial.",
        duration: "5 años",
        modality: "Semipresencial",
        skillsLearned: ["Redacción periodística y narrativa digital", "Producción de televisión y locución de radio", "Estrategia de redes sociales y analítica", "Comunicación política y corporativa"],
        fieldHighlights: ["Estudio de televisión profesional y cabinas de radio integradas", "Canal de difusión digital gestionado por alumnos", "Convenios de intercambio con agencias de publicidad líderes"]
      }
    ]
  },
  {
    id: "uca",
    name: "Universidad Centroamericana José Simeón Cañas",
    abbreviation: "UCA",
    accentColor: "#B22222", // Deep red UCA color
    description: "Reconocida por su excelencia académica en ingenierías, ciencias sociales y economía. Inspira profesionales comprometidos con la transformación de la realidad nacional.",
    website: "https://www.uca.edu.sv",
    programs: [
      {
        id: "uca-computacion",
        name: "Ingeniería Informática",
        category: "ingenieria",
        description: "Desarrollo de software complejo, inteligencia artificial, arquitectura de redes, ciberseguridad e ingeniería de datos de clase mundial.",
        duration: "5 años",
        modality: "Presencial",
        skillsLearned: ["Algoritmia y estructuras de datos complejos", "Ingeniería de software (DevOps, Agile)", "Ciencia de datos e inteligencia artificial", "Administración de bases de datos relacionales y NoSQL"],
        fieldHighlights: ["Laboratorio de supercomputación y computación científica", "Comunidad activa de hacking ético y desarrollo open source", "Proyectos de impacto social para la digitalización de servicios públicos"]
      },
      {
        id: "uca-industrial",
        name: "Ingeniería Industrial",
        category: "ingenieria",
        description: "Optimización de procesos productivos, gestión de cadenas de suministro, control de calidad y dirección de operaciones en organizaciones globales.",
        duration: "5 años",
        modality: "Presencial",
        skillsLearned: ["Investigación de operaciones y modelos matemáticos", "Gestión de calidad y metodologías Lean Six Sigma", "Logística y cadena de suministro global", "Evaluación económica de proyectos industriales"],
        fieldHighlights: ["Laboratorio de manufactura integrada por computadora", "Simulación matemática de plantas de producción", "Fuerte vínculo con la Asociación Salvadoreña de Industriales (ASI)"]
      },
      {
        id: "uca-administracion",
        name: "Licenciatura en Administración de Empresas",
        category: "negocios",
        description: "Forma estrategas de negocios con sólida formación ética, financiera y gerencial, capaces de liderar empresas de triple impacto.",
        duration: "5 años",
        modality: "Semipresencial",
        skillsLearned: ["Finanzas corporativas e inversión", "Dirección estratégica y gobernanza", "Mercadotecnia y análisis de mercado", "Emprendimiento de base tecnológica e impacto social"],
        fieldHighlights: ["Centro de Emprendimiento e Innovación UCA", "Simuladores de negocios en tiempo real", "Resolución de casos empresariales de estudio Harvard"]
      }
    ]
  }
];

export const VOCATIONAL_QUIZ: VocationalQuestion[] = [
  {
    id: 1,
    question: "¿Qué tipo de actividades te llaman más la atención en tu tiempo libre?",
    options: [
      { text: "Aprender cómo funciona el cuerpo humano o leer sobre avances científicos.", score: "salud" },
      { text: "Desarmar aparatos electrónicos, programar o resolver acertijos lógicos.", score: "ingenieria" },
      { text: "Escribir historias, debatir sobre noticias del país o hacer voluntariado social.", score: "social" },
      { text: "Dibujar, tomar fotografías, editar videos o diseñar espacios creativos.", score: "creativo" },
      { text: "Organizar eventos familiares, planear presupuestos o idear negocios propios.", score: "negocios" }
    ]
  },
  {
    id: 2,
    question: "Si tuvieras que solucionar un problema en tu comunidad, ¿cuál elegirías?",
    options: [
      { text: "Organizar brigadas de atención médica y vacunación preventiva.", score: "salud" },
      { text: "Crear un sistema automatizado para reciclar agua o una app de alerta comunitaria.", score: "ingenieria" },
      { text: "Impartir asesorías legales gratuitas o talleres de prevención de violencia.", score: "social" },
      { text: "Diseñar una campaña visual artística para embellecer los parques públicos.", score: "creativo" },
      { text: "Crear una cooperativa para impulsar los negocios locales y generar empleo.", score: "negocios" }
    ]
  },
  {
    id: 3,
    question: "¿Cuál de estos roles te gustaría desempeñar en un proyecto escolar?",
    options: [
      { text: "Investigar datos científicos confiables para dar sustento de salud al tema.", score: "salud" },
      { text: "Estructurar la parte técnica, armar las diapositivas con gráficos o programar códigos.", score: "ingenieria" },
      { text: "Redactar el reporte final, exponer ante la clase o entrevistar a personas afectadas.", score: "social" },
      { text: "Darle un formato visual impecable, diseñar folletos o dirigir la estética del video.", score: "creativo" },
      { text: "Coordinar los tiempos de todos, administrar los recursos y presentar el plan de acción.", score: "negocios" }
    ]
  },
  {
    id: 4,
    question: "Cuando entras a una tienda o negocio, ¿en qué te fijas primero?",
    options: [
      { text: "En sus protocolos de higiene y medidas sanitarias.", score: "salud" },
      { text: "En los sistemas tecnológicos que usan para cobrar o el equipo que operan.", score: "ingenieria" },
      { text: "En cómo tratan a los clientes y el ambiente social que se percibe.", score: "social" },
      { text: "En el diseño del logotipo, las luces, la publicidad y la decoración del lugar.", score: "creativo" },
      { text: "En qué productos se venden más, los precios y qué tan rentable se ve el negocio.", score: "negocios" }
    ]
  }
];
