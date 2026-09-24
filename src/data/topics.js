// Temario del Examen General Básico (SMV Panamá) — 12 secciones (A–L).
// Contenido resumido a partir de la carpeta Material: cursos (parte legal y financiera),
// Ley del Mercado de Valores (Texto Único) y Acuerdos 2-2011, 5-2014, 6-2015 y 1-2026.
// Las notas marcadas como "general" complementan temas del temario que el material no desarrolla.

export const TOPICS = [
  {
    id: 'nacional',
    letter: 'A',
    title: 'Entorno Económico Nacional',
    short: 'Economía de Panamá',
    color: '#0ea5e9',
    summary: 'Características de la economía panameña, sectores, instituciones financieras y Panamá como hub logístico.',
    lessons: [
      {
        title: 'Características de la economía de Panamá',
        general: true,
        blocks: [
          { type: 'p', text: 'Panamá es una economía pequeña, abierta y de servicios. Su rasgo más distintivo es la dolarización: el dólar de EE.UU. circula como moneda de curso legal desde 1904 junto al Balboa (B/.), que está fijado 1:1 al dólar y solo existe en monedas.' },
          { type: 'list', items: [
            'No existe un banco central emisor ni política monetaria propia: la liquidez depende de los flujos externos y del sistema bancario.',
            'Sin riesgo cambiario frente al USD; la inflación tiende a ser baja y vinculada a la de EE.UU.',
            'La política económica descansa principalmente en la política fiscal (MEF) y en la regulación prudencial (SBP, SMV, SSRP).',
            'El sector servicios (logística, Canal, comercio, banca, turismo) representa la mayor parte del PIB.',
          ] },
          { type: 'callout', tone: 'key', text: 'Dolarización = sin banco central, sin prestamista de última instancia tradicional y sin tipo de cambio propio. El Banco Nacional de Panamá actúa como banco del Estado y agente financiero.' },
        ],
      },
      {
        title: 'Sectores, instituciones y mercado de capitales local',
        general: true,
        blocks: [
          { type: 'table', head: ['Sector / Institución', 'Rol'], rows: [
            ['Canal de Panamá', 'Principal activo logístico; aporta ingresos directos al Tesoro.'],
            ['Zona Libre de Colón', 'Zona franca de reexportación más grande del hemisferio.'],
            ['Centro Bancario Internacional', 'Supervisado por la Superintendencia de Bancos (SBP).'],
            ['Superintendencia del Mercado de Valores (SMV)', 'Regula y supervisa el mercado de valores (Ley 67 de 2011).'],
            ['Superintendencia de Seguros y Reaseguros (SSRP)', 'Supervisa aseguradoras.'],
            ['Ministerio de Economía y Finanzas (MEF)', 'Política fiscal, deuda pública; enlace de la SMV con el Órgano Ejecutivo.'],
            ['INEC (Contraloría)', 'Estadísticas oficiales (PIB, inflación, empleo).'],
            ['Consejo de Coordinación Financiera', 'Coordina a los supervisores financieros (creado por la Ley 67 de 2011).'],
          ] },
          { type: 'list', items: [
            'Mercado local: Bolsa Latinoamericana de Valores (Latinex, antes BVP, fundada en 1990) y Latinclear (central de custodia, 1997).',
            'Instrumentos más negociados: VCNs, bonos corporativos, Letras y Notas del Tesoro, acciones y fondos.',
            'Ventaja fiscal: emitir a través de bolsa ahorra el FECI (1%) de los préstamos bancarios > $5,000 e intereses exentos de ISR si se colocan por bolsa.',
          ] },
          { type: 'callout', tone: 'tip', text: 'Panamá como centro logístico: Canal + puertos en ambos océanos + Zona Libre + aeropuerto hub (Tocumen) + centro bancario.' },
        ],
      },
    ],
  },
  {
    id: 'internacional',
    letter: 'B',
    title: 'Entorno Económico Internacional',
    short: 'Economía mundial',
    color: '#6366f1',
    summary: 'Organismos multilaterales, sistemas económicos, globalización, crisis y mercados emergentes.',
    lessons: [
      {
        title: 'Organización de la economía mundial',
        general: true,
        blocks: [
          { type: 'table', head: ['Organismo', 'Función principal'], rows: [
            ['FMI (Fondo Monetario Internacional)', 'Estabilidad del sistema monetario internacional; apoyo a balanzas de pagos; elige las divisas de reserva (DEG).'],
            ['Banco Mundial (BIRF/AIF)', 'Financiamiento para desarrollo y reducción de la pobreza.'],
            ['OMC', 'Reglas del comercio internacional; solución de controversias.'],
            ['ONU', 'Paz, seguridad y desarrollo; agencias como la CEPAL y el PNUD.'],
            ['BID', 'Banco regional de desarrollo para América Latina y el Caribe.'],
            ['BIS / BPI (Basilea)', 'Banco de bancos centrales; estándares de Basilea.'],
            ['GAFI (FATF)', 'Estándares contra el blanqueo de capitales y financiamiento del terrorismo.'],
            ['IOSCO', 'Organización internacional de reguladores de valores.'],
          ] },
        ],
      },
      {
        title: 'Sistemas económicos, globalización y crisis',
        general: true,
        blocks: [
          { type: 'list', items: [
            'Capitalismo: propiedad privada y mercado como asignador de recursos. Socialismo: propiedad estatal/planificación. Economía mixta: combinación de ambos.',
            'Populismo: políticas de corto plazo orientadas a la popularidad, con frecuencia expansión fiscal insostenible.',
            'Globalización: integración de mercados de bienes, servicios y capitales; los TLC reducen aranceles y barreras.',
            'Economías emergentes: crecimiento alto pero con mayor riesgo país, cambiario y político.',
          ] },
          { type: 'table', head: ['Crisis', 'Idea clave'], rows: [
            ['1929 (Gran Depresión)', 'Colapso bursátil y bancario; origen de la SEC (1934).'],
            ['1997 (Asiática)', 'Crisis cambiaria por tipos de cambio fijos y deuda en dólares.'],
            ['2008 (Subprime)', 'Hipotecas de baja calidad, derivados (CDS, MBS) y quiebra de Lehman Brothers.'],
            ['2020 (COVID-19)', 'Choque de oferta y demanda; tasas en cero y estímulos masivos.'],
          ] },
          { type: 'callout', tone: 'tip', text: 'Un dólar "barato" (depreciado) encarece los productos extranjeros y favorece las exportaciones del país que usa esa moneda.' },
        ],
      },
    ],
  },
  {
    id: 'forex',
    letter: 'C',
    title: 'Mercado de Divisas (Forex)',
    short: 'Forex',
    color: '#14b8a6',
    summary: 'Divisas, tipos de cambio, pips, participantes, teorías cambiarias y arbitraje.',
    lessons: [
      {
        title: 'Conceptos básicos',
        blocks: [
          { type: 'p', text: 'Divisa es la unidad monetaria de un país extranjero; moneda es la del país local. El mercado de divisas (Forex) opera 24 horas, de lunes a viernes, es el mercado financiero más grande del mundo (le sigue el de derivados) y su plaza principal es Londres.' },
          { type: 'list', items: [
            'Divisas de reserva (elegidas por el FMI): dólar (USD), euro (EUR), libra esterlina (GBP), yen (JPY) y yuan/renminbi (CNY).',
            'La libra esterlina es la divisa más antigua del mundo que aún circula.',
            'Los tipos de cambio se expresan con 4 decimales; 1 PIP ("point in percentage") es un movimiento de una unidad en el cuarto decimal (en pares con JPY, el segundo decimal).',
            'Spread = diferencia entre bid (precio de compra) y ask/offer (precio de venta).',
            'Apalancamiento: operar volúmenes grandes con poco capital (margen); amplifica ganancias y pérdidas.',
          ] },
          { type: 'callout', tone: 'key', text: 'Según la Ley del Mercado de Valores (art. 72), la actividad Forex por cuenta de clientes solo la pueden realizar las casas de valores.' },
        ],
      },
      {
        title: 'Oferta, demanda y tipo de cambio',
        blocks: [
          { type: 'table', head: ['Fuentes de OFERTA de divisas', 'Fuentes de DEMANDA de divisas'], rows: [
            ['Exportaciones de bienes y servicios', 'Importaciones de bienes y servicios'],
            ['Remesas recibidas del exterior', 'Remesas enviadas al exterior'],
            ['Venta de divisas del Banco Central', 'Compra de divisas del Banco Central'],
            ['Ingreso neto de capital extranjero (IED + portafolio)', 'Salida neta de capital nacional'],
            ['Monetización de créditos internacionales', 'Pago de intereses y capital de deuda externa'],
          ] },
          { type: 'list', items: [
            '↑ oferta de divisas → la moneda nacional se APRECIA (el tipo de cambio baja).',
            '↑ demanda de divisas → la moneda nacional se DEPRECIA (el tipo de cambio sube).',
            'Depreciación: favorece exportaciones y turismo receptivo, encarece la deuda externa en moneda local.',
            'Tipo de cambio fijo: estabilidad y control de inflación, pero exige reservas y limita la reacción ante crisis. En régimen fijo el gobierno "devalúa"; en régimen flotante la moneda "se deprecia".',
            'El régimen de tasa flotante NO requiere uso de reservas para alterar el tipo de cambio.',
          ] },
          { type: 'formula', name: 'Variación porcentual del tipo de cambio', expr: '% = (TC final − TC inicial) / TC inicial', note: 'Ej.: COP/USD pasa de 4,788.63 a 4,925.70 → el peso se deprecia 2.86%.' },
        ],
      },
      {
        title: 'Teorías cambiarias y arbitraje',
        blocks: [
          { type: 'table', head: ['Teoría', 'Exponente', 'Idea'], rows: [
            ['Paridad del Poder Adquisitivo (PPA)', 'Gustav Cassel', 'Ley del precio único. Versión relativa: el país con mayor inflación ve depreciarse su moneda. Ej.: Índice Big Mac.'],
            ['Paridad de tasas de interés', 'John M. Keynes', 'La diferencia entre tipo spot y forward depende del diferencial de tasas entre países.'],
            ['Expectativas racionales', 'John Muth', 'Los agentes usan eficientemente toda la información disponible, incluso anticipan la política del gobierno.'],
          ] },
          { type: 'list', items: [
            'Arbitraje de dos puntos: comprar la divisa donde está más barata y venderla donde está más cara (ej.: CAD a 0.73 en NY y 0.79 en Panamá → ganancia 0.06).',
            'Arbitraje de tres puntos (triangular): GBP→USD en Londres (2.00), USD→JPY en NY (200), JPY→GBP en Tokio (390) → ganancia JPY 10.',
            'Análisis técnico (gráficos, tendencias) vs. análisis fundamental (tasas, inflación, PIB, política).',
            'Órdenes típicas: a mercado, límite, stop-loss, take-profit. Gestión de riesgo: tamaño de posición y stops.',
          ] },
        ],
      },
    ],
  },
  {
    id: 'curva',
    letter: 'D',
    title: 'Curva de Rendimiento',
    short: 'Curva de rendimiento',
    color: '#f59e0b',
    summary: 'Construcción, formas, teorías y uso como predictor de política monetaria y ciclo económico.',
    lessons: [
      {
        title: 'Qué es y cómo se construye',
        blocks: [
          { type: 'p', text: 'La curva de rendimiento representa gráficamente la relación entre los rendimientos al vencimiento (YTM) de bonos con calificación crediticia similar y sus plazos al vencimiento. Normalmente se construye con bonos de gobierno, porque existen en toda la gama de plazos y se negocian libremente.' },
          { type: 'list', items: [
            'La diferencia entre la curva de un emisor y la curva libre de riesgo (benchmark) es la PRIMA DE RIESGO (spread).',
            'Para emisores panameños en dólares (ej. Banco General), el benchmark adecuado es la curva del Tesoro de EE.UU.',
            'La prima de riesgo de un país está estrechamente relacionada con su calificación.',
            '1% = 100 puntos básicos (pb). Un aumento de ½% = 50 pb.',
          ] },
        ],
      },
      {
        title: 'Formas de la curva y teorías',
        blocks: [
          { type: 'table', head: ['Forma', 'Lectura (Teoría de Expectativas)'], rows: [
            ['Ascendente (positiva)', 'Liquidez a corto plazo y expectativa de crecimiento; política monetaria NO restrictiva.'],
            ['Nivelada (flat)', 'Inicio de política restrictiva: tasas cortas suben más rápido (FED sube la Fed Funds).'],
            ['Descendente (invertida)', 'Política restrictiva que desacelera la economía; spread largo−corto negativo; anticipa RECESIÓN.'],
            ['Creciente y decreciente (joroba)', 'Transición entre ciclos.'],
          ] },
          { type: 'table', head: ['Teoría', 'Idea clave'], rows: [
            ['Preferencia por liquidez (Hicks, 1939)', 'Inversionistas prefieren corto plazo; emisores prefieren largo plazo → prima por vencimiento → curva normalmente ascendente.'],
            ['Segmentación de mercados', 'Cada tramo es un mercado distinto; las tasas surgen de la oferta y demanda en cada plazo.'],
            ['Hábitat preferido (Modigliani y Sutch, 1966)', 'Los agentes prefieren el tramo que calza activos y pasivos; solo lo abandonan si se les paga una prima.'],
            ['Expectativas', 'La forma refleja expectativas de tasas futuras y de política monetaria.'],
          ] },
          { type: 'callout', tone: 'key', text: 'La curva invertida es considerada el mejor predictor de recesiones. Los precios de los bonos largos suben cuando se espera que la inflación se controle (sus rendimientos bajan).' },
        ],
      },
      {
        title: 'Uso en gestión de carteras',
        blocks: [
          { type: 'list', items: [
            'Si se espera que las tasas BAJEN: alargar duración (comprar bonos largos) para ganar por apreciación de precio.',
            'Si se espera que las tasas SUBAN: acortar duración; los bonos de largo plazo tienen mayor volatilidad de precio.',
            'Los instrumentos de corto plazo reaccionan más inmediatamente a los cambios de tasas.',
            'Desviaciones de la curva (bonos "ricos" o "baratos") indican oportunidades de valor relativo.',
          ] },
        ],
      },
    ],
  },
  {
    id: 'corporativas',
    letter: 'E',
    title: 'Finanzas Corporativas',
    short: 'Finanzas corporativas',
    color: '#ef4444',
    summary: 'Estructura financiera, fuentes de financiamiento, valoración de proyectos (VAN, TIR, VP, VF) y dividendos.',
    lessons: [
      {
        title: 'Valor del dinero en el tiempo',
        blocks: [
          { type: 'p', text: 'Lo que se paga hoy por un activo financiero es la suma de sus flujos esperados descontados a una tasa acorde con su riesgo, más el valor terminal descontado.' },
          { type: 'formula', name: 'Valor Presente', expr: 'VP = VF / (1 + i)^n', note: 'Cuánto pagar hoy para obtener un retorno i.' },
          { type: 'formula', name: 'Valor Futuro', expr: 'VF = VP × (1 + i)^n', note: 'Principal inicial más el interés acumulado.' },
          { type: 'formula', name: 'Tasa (TIR / YTM / tasa de descuento)', expr: 'i = (VF / VP)^(1/n) − 1', note: 'Retorno anualizado compuesto.' },
          { type: 'callout', tone: 'tip', text: 'A mayor tasa de descuento (mayor riesgo percibido), menor el valor presente. Ej. del curso: un bono de $200,000 vale $221,629 al 12% y solo $181,237 al 18%.' },
        ],
      },
      {
        title: 'VAN, TIR y estructura financiera',
        blocks: [
          { type: 'formula', name: 'Valor Actual Neto', expr: 'VAN = −I₀ + Σ FCₜ / (1 + k)^t', note: 'Aceptar si VAN > 0.' },
          { type: 'formula', name: 'Tasa Interna de Retorno', expr: 'TIR: tasa que hace VAN = 0', note: 'Se halla por ensayo y error; aceptar si TIR > costo de capital.' },
          { type: 'formula', name: 'Costo de capital (WACC)', expr: 'WACC = (E/V)·Ke + (D/V)·Kd·(1 − t)', note: 'Retorno exigido por accionistas y acreedores ponderado.' },
          { type: 'list', items: [
            'Objetivo de las finanzas corporativas: maximizar el valor para el accionista.',
            'Corto plazo: crédito comercial, líneas bancarias, VCNs/papel comercial, factoring.',
            'Largo plazo: bonos, préstamos a plazo, acciones comunes y preferentes, utilidades retenidas.',
            'Más deuda → mayor apalancamiento financiero y mayor riesgo (y ROE más volátil).',
            'Política de dividendos: la declara la Junta Directiva (no la aprueban los accionistas); se paga en efectivo, en acciones o en acciones de otra empresa.',
            'Un bajo payout ratio (retener utilidades) aumenta el patrimonio de los accionistas.',
          ] },
        ],
      },
    ],
  },
  {
    id: 'local',
    letter: 'F',
    title: 'Conceptos Básicos del Mercado Local',
    short: 'Mercado de Panamá',
    color: '#22c55e',
    summary: 'Historia, reguladores, Latinex (BVP), Latinclear, proceso de emisión, creadores de mercado y calificadoras.',
    lessons: [
      {
        title: 'Historia del mercado de valores panameño',
        blocks: [
          { type: 'table', head: ['Año', 'Hito'], rows: [
            ['1970', 'Decreto de Gabinete 247 (16 de julio): primera regulación y primera Comisión Nacional de Valores (5 miembros). Surge por los fondos mutuos "offshore".'],
            ['1972', 'Modificado por el Decreto de Gabinete No. 30.'],
            ['1990', 'Se crea la Bolsa de Valores de Panamá (junio) con 8 puestos de bolsa.'],
            ['1997', 'Se crea Latinclear (central de custodia y liquidación).'],
            ['1999', 'Decreto Ley 1 de 8 de julio: crea la Comisión Nacional de Valores (CNV) autónoma.'],
            ['2011', 'Ley 67 de 1 de septiembre: crea la Superintendencia del Mercado de Valores (SMV) en reemplazo de la CNV.'],
            ['2012 / 2016', 'Reformas: Ley 12 y Ley 56 de 2012; Ley 66 de 9 de diciembre de 2016 (última gran reforma).'],
          ] },
        ],
      },
      {
        title: 'Latinex (BVP), Latinclear y proceso de emisión',
        blocks: [
          { type: 'list', items: [
            'La BVP (hoy Bolsa Latinoamericana de Valores – Latinex) es una S.A. fundada en 1990; usa el Nasdaq Matching Engine.',
            'Tipos de miembros: Titular, Asociado y Operador Remoto.',
            'Miembro Titular: licencia de casa de valores, dedicación exclusiva, Ejecutivo Principal + Corredor + Oficial de Cumplimiento, capital pagado ≥ $350,000, pólizas de Latinclear.',
            'Latinclear: custodia el 100% del mercado local; permite liquidar, compensar y custodiar valores físicos y desmaterializados.',
          ] },
          { type: 'steps', items: [
            'El emisor identifica su necesidad de fondos y el instrumento adecuado.',
            'Contrata un puesto de bolsa para estructurar y colocar la emisión.',
            'Solicita el registro de la oferta pública a la SMV (con prospecto informativo).',
            'La SMV aprueba o pide correcciones.',
            'El puesto de bolsa coloca la emisión entre clientes y otros puestos.',
            'Las operaciones se cruzan en la bolsa y los títulos se custodian en Latinclear.',
          ] },
          { type: 'callout', tone: 'key', text: 'Creador de mercado (Acuerdo 2-2011, art. 18): casa de valores que regularmente y de buena fe publica cotizaciones competitivas de compra y venta y está dispuesta a negociar a esos precios.' },
        ],
      },
    ],
  },
  {
    id: 'usos',
    letter: 'G',
    title: 'Usos y Costumbres (Mercado Internacional)',
    short: 'Usos y costumbres',
    color: '#a855f7',
    summary: 'Tipos de mercados, intermediarios vs. dealers, NYSE, órdenes, ventas en corto, especialista y conceptos de negociación.',
    lessons: [
      {
        title: 'Mercados y participantes',
        blocks: [
          { type: 'table', head: ['Mercado', 'Características'], rows: [
            ['Mercado de bolsa', 'Valores registrados (NYSE, AMEX, BVP). Subasta doble; especialista mantiene el orden. 9:30–4:00 EST.'],
            ['Extrabursátil (OTC)', 'Valores no registrados; red de dealers por computadora/teléfono; mercado negociado; formadores de mercado.'],
            ['Tercer mercado', 'Valores registrados en bolsa negociados fuera de bolsa (OTC). Reporte a la cinta consolidada en 90 segundos.'],
            ['Cuarto mercado', 'Institucional; grandes bloques negociados en privado (INSTINET).'],
          ] },
          { type: 'table', head: ['Intermediario / Broker (agente)', 'Principal / Dealer'], rows: [
            ['Actúa por cuenta del cliente; cobra comisión.', 'Compra y vende para su inventario; gana un sobreprecio (mark-up / mark-down).'],
            ['No es formador de mercado.', 'Forma mercado; puede tomar posiciones largas o cortas.'],
            ['Debe divulgar su función y el monto de su comisión.', 'Debe divulgar su función pero NO su sobreprecio.'],
          ] },
          { type: 'callout', tone: 'warn', text: 'No se puede ser intermediario y principal en la misma transacción (sería un beneficio oculto).' },
        ],
      },
      {
        title: 'Bolsas e índices',
        blocks: [
          { type: 'list', items: [
            'NYSE ("Big Board"): ~¾ de las operaciones de bolsa. Requisitos de listado: 1.1 millones de acciones públicas, 2,000 accionistas con al menos 1 lote (100 acciones), precio mínimo $3.',
            'AMEX fue adquirida por NYSE en 2008 (NYSE American). NASDAQ: bolsa electrónica, 2ª de EE.UU.',
            'FINRA: autorregulador privado de brokers y dealers en EE.UU.; la SEC es el regulador estatal.',
          ] },
          { type: 'table', head: ['Índice', 'Mercado'], rows: [
            ['Dow Jones Industrial Average', '30 grandes empresas de EE.UU.'],
            ['S&P 500', '500 empresas; "índice madre".'],
            ['NASDAQ 100', '100 mayores del NASDAQ.'],
            ['DAX (30/40)', 'Alemania (Frankfurt, plataforma XETRA).'],
            ['FTSE 100', 'Londres.'],
            ['CAC 40', 'Francia (Euronext París).'],
            ['IBEX 35', 'España.'],
            ['EURO STOXX 50', '50 valores líderes de la zona euro.'],
            ['SMI', 'Suiza (20 empresas).'],
            ['Nikkei 225 / TOPIX', 'Tokio.'],
            ['BOVESPA', 'Brasil (São Paulo, la mayor de Latinoamérica).'],
            ['IPC', 'México (35 empresas).'],
            ['S&P/TSX Composite', 'Toronto.'],
            ['CSI 300', 'Shanghái y Shenzhen.'],
          ] },
        ],
      },
      {
        title: 'Órdenes y ventas en corto',
        blocks: [
          { type: 'table', head: ['Orden', 'Qué hace'], rows: [
            ['A mercado', 'Se ejecuta al precio del momento; tiene prioridad.'],
            ['Límite', 'Fija el precio máximo de compra o mínimo de venta; puede no ejecutarse.'],
            ['GTC (Good till cancelled)', 'Orden límite abierta hasta que el cliente la cancele.'],
            ['FOK (Fill or kill)', 'Se ejecuta completa inmediatamente o se cancela.'],
            ['AON (All or none)', 'Todo o nada durante la jornada.'],
            ['Stop (compra) sobre el mercado', 'Compra al romper una banda de precio.'],
            ['Stop (venta) bajo el mercado', 'Stop-loss: salir para no seguir perdiendo.'],
            ['Venta límite sobre el mercado', 'Realizar ganancias.'],
            ['Compra límite bajo el mercado', 'Comprar "barato"; agrega liquidez al libro.'],
          ] },
          { type: 'list', items: [
            'Órdenes colocadas DEBAJO del mercado (compra límite y venta stop) se reducen en la fecha ex-dividendo por el monto del dividendo.',
            'Venta corta: vender acciones prestadas esperando que baje el precio; riesgo teóricamente ilimitado.',
            'Especialista: mantiene un mercado justo y ordenado; lleva el libro de órdenes (confidencial); puede actuar como agente o principal, pero no competir con el público.',
            'Cotización "51 1/8 a 1/2": compras a mercado a 51.50 (offer) y ventas a mercado a 51.125 (bid).',
            'Ecuación de Fisher: YTM (nominal) = rendimiento real + inflación.',
            'TED spread: tasa interbancaria (Eurodólar) − T-bill. Ej.: 5.50% − 5.10% = 40 pb.',
            'Bonos globales: emisiones soberanas internacionales, negociadas OTC.',
          ] },
        ],
      },
    ],
  },
  {
    id: 'portafolio',
    letter: 'H',
    title: 'Teoría Moderna del Portafolio',
    short: 'Portafolio y CAPM',
    color: '#ec4899',
    summary: 'Markowitz, riesgo y retorno, diversificación, frontera eficiente, CAPM, beta y ratio de Sharpe.',
    lessons: [
      {
        title: 'Markowitz y la diversificación',
        blocks: [
          { type: 'p', text: 'Harry Markowitz (1952) demostró que los inversionistas deben mantener portafolios de varios activos: la diversificación reduce el riesgo manteniendo el retorno esperado.' },
          { type: 'list', items: [
            'Gestión activa: el gestor decide según su convicción. Gestión pasiva: replica un índice (más barata).',
            'Averso al riesgo: ante igual retorno elige menor riesgo (la mayoría; perfil conservador). Neutral: indiferente. Propenso: elige el de mayor riesgo.',
            'Riesgo sistemático (de mercado, macro) NO es diversificable. Riesgo no sistemático (específico) SÍ es diversificable.',
            'Correlación −1: movimientos inversos (máxima diversificación). +1: se mueven igual (no hay beneficio).',
            'Frontera eficiente: portafolios con el máximo retorno para cada nivel de riesgo.',
          ] },
          { type: 'formula', name: 'Retorno esperado de un título', expr: 'E(R) = Σ pᵢ · Rᵢ', note: 'Ej.: 25%·25% + 50%·15% + 25%·5% = 15%.' },
          { type: 'formula', name: 'Retorno esperado del portafolio', expr: 'E(Rp) = Σ wᵢ · E(Rᵢ)', note: 'Ej. del curso: 30%·15% + 50%·27.5% + 20%·17.5% = 21.75%.' },
          { type: 'formula', name: 'Desviación estándar', expr: 'σ = √[ Σ pᵢ · (Rᵢ − E(R))² ]', note: 'El riesgo del portafolio NO es el promedio ponderado de las σ: depende de la covarianza (10.40% vs 10.44% en el ejemplo).' },
        ],
      },
      {
        title: 'CAPM, beta y Sharpe',
        blocks: [
          { type: 'formula', name: 'CAPM', expr: 'Kj = Rf + β · (Km − Rf)', note: 'Ej.: Rf 6%, Km 15%, β 0.30 → 6% + 0.3·9% = 8.7%.' },
          { type: 'list', items: [
            'Beta mide la sensibilidad del título frente al mercado. El mercado tiene β = 1.',
            'β = 2: el doble de volátil que el mercado. β = 0.5: la mitad del riesgo del mercado.',
            'Supuesto polémico del CAPM: expectativas homogéneas de todos los inversionistas.',
          ] },
          { type: 'formula', name: 'Ratio de Sharpe', expr: 'S = (Rp − Rf) / σp', note: 'Ej.: (15% − 7%) / 22% = 0.36. Mide la recompensa por unidad de volatilidad.' },
        ],
      },
    ],
  },
  {
    id: 'opciones',
    letter: 'I',
    title: 'Opciones, Warrants y Derivados',
    short: 'Derivados',
    color: '#f97316',
    summary: 'Forwards, futuros, opciones (call/put), moneyness, griegas, warrants, swaps y CDS.',
    lessons: [
      {
        title: 'Derivados: generalidades',
        blocks: [
          { type: 'p', text: 'Un derivado es un contrato cuyo precio depende de otro activo (subyacente): acciones, metales, divisas, tasas de interés, etc. Tipos básicos: opciones, futuros/forwards y swaps.' },
          { type: 'table', head: ['Año', 'Hito'], rows: [
            ['1630–1637', 'Crisis de los tulipanes (Holanda): primeros derivados registrados.'],
            ['1730', 'Mercado Cho-Ai-Mai (Japón): primer mercado formal de futuros (arroz).'],
            ['1848', 'Chicago Board of Trade (CBOT).'],
            ['1898 / 1919', 'Chicago Butter and Egg Board → CME.'],
            ['1973', 'CBOE, fundado por el CBOT; mayor mercado de opciones de EE.UU.'],
            ['2007–hoy', 'CME Group (CME + CBOT + NYMEX + COMEX).'],
          ] },
          { type: 'table', head: ['Característica', 'Mercado organizado', 'OTC'], rows: [
            ['Contratos', 'Estandarizados', 'A la medida'],
            ['Relación', 'Vía cámara de compensación', 'Directa'],
            ['Liquidez', 'Alta', 'Baja'],
            ['Garantías', 'Obligatorias', 'Negociadas'],
            ['Riesgo de contraparte', 'Lo asume la cámara', 'Lo asumen las partes'],
            ['Ejemplos', 'Opciones, futuros', 'Forwards, notas estructuradas, CFD'],
          ] },
          { type: 'list', items: [
            'Formas de participar: especulación, cobertura (hedging) y arbitraje (sin inversión propia, beneficio neto sin riesgo).',
            'ISDA: estandariza contratos de derivados OTC (reduce incertidumbre legal y riesgo de crédito).',
            'Forward: obligación OTC de comprar (largo) o vender (corto) un activo a precio pactado en fecha futura. Largo gana si St > F; corto gana si St < F.',
            'Apalancamiento: con ~20% del valor se entra a la operación. Ej.: 10:1 convierte un +4% en +40%.',
          ] },
        ],
      },
      {
        title: 'Opciones',
        blocks: [
          { type: 'p', text: 'Una opción da al comprador el DERECHO (no la obligación) de comprar (call) o vender (put) un subyacente a un precio de ejercicio (strike) durante un plazo, a cambio de una prima. El vendedor tiene la OBLIGACIÓN.' },
          { type: 'table', head: ['Posición', 'Expectativa', 'Ganancia máx.', 'Pérdida máx.', 'Punto de equilibrio'], rows: [
            ['Compra Call', 'Alcista', 'Ilimitada', 'Prima', 'Strike + prima'],
            ['Compra Put', 'Bajista', 'Strike − prima', 'Prima', 'Strike − prima'],
            ['Venta Call', 'Bajista/neutral', 'Prima', 'Ilimitada', 'Strike + prima'],
            ['Venta Put', 'Alcista/neutral', 'Prima', 'Strike − prima', 'Strike − prima'],
          ] },
          { type: 'table', head: ['Moneyness', 'Call', 'Put'], rows: [
            ['In the money (ITM)', 'Spot > Strike', 'Spot < Strike'],
            ['At the money (ATM)', 'Spot = Strike', 'Spot = Strike'],
            ['Out of the money (OTM)', 'Spot < Strike', 'Spot > Strike'],
          ] },
          { type: 'list', items: [
            'Europea: solo al vencimiento. Americana: en cualquier momento. Bermuda: en fechas específicas antes del vencimiento y al vencimiento.',
            'Valor intrínseco: Call = máx(S − K, 0); Put = máx(K − S, 0). Valor temporal = prima − valor intrínseco.',
            'Naked call / naked put: venta de opciones sin cobertura; alto riesgo.',
            'Griegas (Black-Scholes): Delta (sensibilidad al subyacente), Gamma (cambio de la delta), Theta (paso del tiempo), Vega (volatilidad), Rho (tasa de interés).',
          ] },
        ],
      },
      {
        title: 'Warrants, swaps y CDS',
        blocks: [
          { type: 'table', head: ['Opciones', 'Warrants'], rows: [
            ['Se negocian en bolsa', 'Los emite una empresa (tipo opción OTC)'],
            ['Se pueden vender calls y puts libremente', 'El inversor solo compra el derecho'],
            ['Vencen en meses', 'Pueden durar años'],
          ] },
          { type: 'list', items: [
            'Similitudes: ambos son derivados, dan derecho a comprar/vender y son apalancados.',
            'Credit Default Swap (CDS): el vendedor promete pagar la deuda si el emisor incumple; el comprador paga una prima periódica. No se necesita ser tenedor del bono (puede especularse).',
            'MBS/MDO respaldados solo por hipotecas; ABS respaldados por otros activos (tarjetas, autos, etc.).',
          ] },
        ],
      },
    ],
  },
  {
    id: 'capitales',
    letter: 'J',
    title: 'Mercados de Capitales: Renta Fija y Variable',
    short: 'Bonos y acciones',
    color: '#3b82f6',
    summary: 'Bonos, rendimientos, calificaciones, mercado de dinero, acciones, dividendos, splits, convertibles, sociedades de inversión y margen.',
    lessons: [
      {
        title: 'Mercados financieros y riesgo',
        blocks: [
          { type: 'table', head: ['Mercado', 'Descripción', 'Ejemplos'], rows: [
            ['Dinero', 'Corto plazo (< 1 año), líquido, alta calidad, solo deuda; entre dealers OTC.', 'Letras del Tesoro, VCNs/papel comercial, repos, aceptaciones bancarias, CDs'],
            ['Capitales', 'Mediano/largo plazo y perpetuos.', 'Acciones, notas y bonos'],
            ['Derivados', 'Valor derivado de otro activo; especulación o cobertura.', 'Opciones, futuros, swaps'],
            ['Divisas', 'Intercambio de monedas.', 'Forex'],
          ] },
          { type: 'list', items: [
            'Riesgos macro (sistemáticos, no diversificables) vs. micro (específicos, diversificables) vs. ciegos (sin precedentes).',
            'De empresa: mercado, tasa, reinversión, liquidez, operativo, reputacional, crediticio, contraparte, lavado de dinero.',
            'De país: soberano, transferencia, legal, político, inflacionario, cambiario.',
          ] },
          { type: 'formula', name: 'Prima de riesgo', expr: 'Prima = E(r) − Tasa libre de riesgo', note: 'Tasas base: Treasuries de EE.UU. (o alemanes), Prime, SOFR/LIBOR, emisiones mejor calificadas.' },
        ],
      },
      {
        title: 'Renta fija: bonos',
        blocks: [
          { type: 'list', items: [
            'Un bono es un préstamo al emisor: el tenedor es acreedor, sin voto, pero con prioridad sobre los accionistas en quiebra.',
            'Gobierno: Letras (≤ 1 año), Notas (1–10 años), Bonos (10–30 años), Perpetuos (> 30 años).',
            'Intereses: semestrales en EE.UU., trimestrales en Panamá, anuales en Europa. Valor nominal típico $1,000.',
            'Precio en % del nominal: 102¾ = $1,027.50 por bono. Descuento < 100 < prima.',
            'Call (amortización anticipada): el emisor redime antes; suele pagar prima; protección "anti-call" de 3–10 años. Fondo de amortización administrado por el fiduciario.',
            'Relación precio–rendimiento INVERSA: suben las tasas → bajan los precios.',
            'Bono a prima: precio > par; cupón > rendimiento corriente > YTM.',
          ] },
          { type: 'table', head: ['Tipo de bono', 'Garantía / característica'], rows: [
            ['Prendarios (hipotecarios, fiduciarios, con garantía de equipo)', 'Respaldados por activos o por otros valores (garantía prendaria).'],
            ['Quirografarios (debentures/obligaciones)', 'Solo el crédito general del emisor; debajo de los garantizados, encima de las acciones.'],
            ['Subordinados', 'Cobran después de los demás acreedores, antes que los accionistas; suelen ser convertibles.'],
            ['De ingresos (income bonds)', 'Pagan intereses solo si hay ingresos; usados al salir de quiebra.'],
            ['Cupón cero', 'Se compran con gran descuento; no pagan flujos hasta el vencimiento.'],
          ] },
          { type: 'steps', title: 'Prelación en caso de quiebra', items: [
            'Empleados (salarios y prestaciones)', 'Gobierno (impuestos)', 'Deuda garantizada (prendarios)', 'Pasivos sin garantía (quirografarios)', 'Deuda subordinada', 'Acciones preferentes', 'Acciones comunes',
          ] },
        ],
      },
      {
        title: 'Rendimientos y calificaciones',
        blocks: [
          { type: 'formula', name: 'Rendimiento nominal (NY)', expr: 'NY = tasa cupón anual' },
          { type: 'formula', name: 'Rendimiento corriente (CY)', expr: 'CY = Cupón anual / Precio', note: 'Ej.: $50 / $800 = 6.25%.' },
          { type: 'formula', name: 'YTM aproximado', expr: 'YTM ≈ [C + (N − P)/n] / [(N + P)/2]', note: 'Ej.: bono a 92%, cupón 10%, 10 años → (100 + 8) / 960 = 11.25%.' },
          { type: 'formula', name: 'Rendimiento a call (YTC)', expr: 'YTC ≈ [C + (Pc − P)/n] / [(Pc + P)/2]', note: 'Call a 101% en 5 años → (100 + 18) / 965 = 12.22%.' },
          { type: 'list', items: [
            'YTW (yield to worst): el peor entre YTM, YTC y YTP.',
            'Cupón corrido: interés acumulado que el comprador paga al vendedor. Bases: Actual/360, Actual/365, Actual/Actual, 30/360.',
            'Grado de inversión: AAA a BBB− (S&P/Fitch) o Aaa a Baa3 (Moody’s). Especulativo ("junk"): BB+ / Ba1 hacia abajo.',
            'Moody’s usa minúsculas y números (Aa1, Baa2); S&P y Fitch usan + y −. AAA no lleva símbolo; de CC a D tampoco.',
            'Moody’s "C" = incumplimiento (default). Las calificadoras se enfocan en el riesgo de incumplimiento.',
          ] },
        ],
      },
      {
        title: 'Renta variable: acciones',
        blocks: [
          { type: 'list', items: [
            'Autorizadas ≥ emitidas; en circulación = emitidas − tesorería. Las acciones en tesorería no votan ni reciben dividendos.',
            'Capitalización bursátil = acciones emitidas × precio de mercado. Valor nominal: irrelevante en comunes.',
            'Superávit de capital (capital pagado en exceso): lo recibido por encima del valor nominal.',
            'Derechos del accionista común: voto (reglamentario o acumulativo), poderes, inspección de registros, precedencia (antidilución), responsabilidad limitada y derecho residual.',
            'Clase A (con voto) y Clase B (sin voto o voto limitado).',
            'Preferentes: híbridos (deuda + capital), dividendo fijo (sobre valor nominal, usualmente $100), prioridad sobre comunes, sin vencimiento, su precio se mueve con las tasas. Tipos: acumulativas, convertibles, participativas, amortizables.',
            'ADR: certificados emitidos por un banco de EE.UU. que representan acciones extranjeras.',
          ] },
          { type: 'formula', name: 'Valor en libros por acción', expr: '(Activos − Pasivos) / Acciones emitidas', note: 'Ej.: ($30MM − $18MM) / 4MM = $3.' },
          { type: 'formula', name: 'Rentabilidad esperada', expr: 'r = (D₁ + P₁ − P₀) / P₀', note: 'Ej.: (5 + 110 − 100) / 100 = 15%.' },
          { type: 'formula', name: 'Split N:M', expr: 'Acciones × N/M ; Precio × M/N', note: 'Split 3:2 de 1MM acc. a $50 → 1.5MM acc. a $33.33.' },
        ],
      },
      {
        title: 'Convertibles, sociedades de inversión y margen',
        blocks: [
          { type: 'formula', name: 'Factor de conversión', expr: 'Acciones = Valor nominal / Precio de conversión', note: '$1,000 / $40 = 25 acciones.' },
          { type: 'formula', name: 'Paridad', expr: 'Precio de paridad de la acción = Precio del bono / Factor', note: 'Bono a 102% → $1,020 / 25 = $40.80. Convertir solo si la acción vale más.' },
          { type: 'list', items: [
            'Convertibles: pagan menos cupón que los no convertibles; combinan seguridad de renta fija y potencial alcista. Riesgo para el emisor: dilución o cambio de control.',
            'Sociedades de inversión abiertas: redención periódica al valor neto (NAV); cantidad variable de cuotas. Cerradas: sin redención (se negocian en bolsa).',
            'Por riesgo: renta fija, variable, inmobiliaria, mercado de dinero o derivados si invierten ≥ 80% de sus activos en ese tipo; si no, es mixta.',
            'ETF: replica un índice y cotiza en bolsa. Load fund: con comisión (front-end, back-end, level). No-load: sin comisión.',
            '12b-1 fee: 0.25%–0.75% anual por mercadeo. Trailers: 0.25%–1%. Management fee: 1%–3%.',
            'Cuenta de margen: operar por montos superiores a los recursos aportados (apalancamiento).',
          ] },
        ],
      },
    ],
  },
  {
    id: 'legal',
    letter: 'K',
    title: 'Ley del Mercado de Valores y Ética',
    short: 'Ley y ética',
    color: '#0f766e',
    summary: 'SMV, casas de valores, asesores, licencias (Acuerdo 5-2014), emisores, OPA, sociedades de inversión, prevención de BC/FT (Acuerdo 6-2015), gestión de riesgos (Acuerdo 1-2026), prohibiciones y sanciones.',
    lessons: [
      {
        title: 'La Superintendencia del Mercado de Valores (SMV)',
        blocks: [
          { type: 'p', text: 'Organismo autónomo del Estado con personería jurídica, patrimonio propio e independencia administrativa, presupuestaria y financiera (art. 2). Su objetivo: regular, supervisar y fiscalizar el mercado de valores en o desde Panamá, propiciando seguridad jurídica, transparencia y la protección de los inversionistas (art. 3).' },
          { type: 'table', head: ['Órgano', 'Datos clave'], rows: [
            ['Junta Directiva', '7 miembros con voz y voto: 5 nombrados por el Ejecutivo (ratificados por la Asamblea, 5 años) + 1 designado por la SBP + 1 por la SSRP (2 años, prorrogable). Solo dietas. Quórum: 4 miembros; decisiones con 4 votos.'],
            ['Requisitos de director', 'Panameño, título universitario, 10 años en el sector financiero, sin condenas, sin parentesco, no más del 5% de acciones de un regulado.'],
            ['Superintendente', 'Representante legal; tiempo completo; 5 años prorrogable una vez; ratificado por la Asamblea; no puede ejercer profesiones liberales. En ausencia temporal, la representación la asume el presidente de la Junta.'],
          ] },
          { type: 'table', head: ['Decisión', 'Quién', 'Alcance'], rows: [
            ['Acuerdos', 'Junta Directiva', 'Aplicación general; desarrollan la Ley y no pueden contradecirla. Se publican en Gaceta Oficial.'],
            ['Opiniones', 'Superintendente', 'Posición administrativa; vinculantes; no contradicen acuerdos ni al Órgano Judicial.'],
            ['Resoluciones', 'Junta o Superintendente', 'De la Junta: individual o general; del Superintendente: solo individual.'],
          ] },
          { type: 'callout', tone: 'key', text: 'Recursos contra decisiones del Superintendente: reconsideración y/o apelación ante la Junta Directiva, dentro de 5 días hábiles. Efecto suspensivo como regla general (devolutivo si hay perjuicio grave, en intervenciones o pruebas).' },
          { type: 'list', items: [
            'Ingresos de la SMV: bienes públicos, presupuesto del Estado, tarifas y multas, donaciones y rentas de su patrimonio.',
            'Consejo Asesor: Cámara Panameña de Mercado de Capitales, Asociación de Agentes Vendedores de Valores, Cámara de Emisores y Asociación de Oficiales de Cumplimiento (opiniones no vinculantes).',
            'No supervisa a los bancos (salvo cuando son casas de valores) ni a las financieras.',
          ] },
        ],
      },
      {
        title: 'Tarifas de registro y de supervisión',
        blocks: [
          { type: 'table', head: ['Registro / licencia (art. 25)', 'Tarifa de registro'], rows: [
            ['Oferta pública de valores', '0.020% del precio inicial (mín. B/.2,000)'],
            ['Programa rotativo', '0.035% del precio inicial (mín. B/.2,000)'],
            ['Derivados', '0.025% (mín. B/.2,000)'],
            ['Notificación de OPA', '0.020% del monto (mín. B/.2,000)'],
            ['Sociedad de inversión', 'B/.5,000 (+B/.1,500 por fondo adicional)'],
            ['Bolsa / Central de valores / Contraparte central', 'B/.35,000'],
            ['Casa de valores', 'B/.20,000'],
            ['Asesor de inversiones / Administrador de inversiones', 'B/.15,000'],
            ['Calificadora / Proveedor de precios', 'B/.10,000'],
            ['Licencias de persona natural (corredor, EP)', 'B/.500'],
            ['Derecho a examen', 'B/.100 por examen'],
            ['Cancelación licencia persona natural', 'B/.150'],
          ] },
          { type: 'table', head: ['Supervisión anual (art. 26)', 'Tarifa'], rows: [
            ['Valores registrados', '0.015% del valor de mercado (mín. 1,000 – máx. 20,000)'],
            ['Sociedad de inversión', '0.0020% del valor neto promedio (1,000 – 20,000)'],
            ['Bolsa de valores', '0.0020% de las negociaciones anuales (10,000 – 100,000)'],
            ['Central de valores', '0.0010% de los valores en custodia (5,000 – 100,000)'],
            ['Casa de valores', '0.0025% de las negociaciones anuales (15,000 – 100,000)'],
            ['Asesor de inversiones', 'B/.7,500'],
            ['Administrador de inversiones, calificadora, proveedor de precios', 'B/.10,000'],
            ['Corredor / analista / ejecutivo principal', 'B/.200'],
          ] },
          { type: 'callout', tone: 'warn', text: 'Los valores del Estado panameño, deuda soberana extranjera y organismos multilaterales no pagan estas tarifas. El curso (2014) mostraba montos anteriores; estos son los del Texto Único vigente (Ley 66 de 2016).' },
        ],
      },
      {
        title: 'Casas de valores (Ley + Acuerdo 2-2011)',
        blocks: [
          { type: 'list', items: [
            'Negocio de comprar y vender valores por cuenta propia o de terceros; objeto exclusivo (salvo bancos o administradores de inversión). Criterio territorial: en o desde Panamá.',
            'Actividades principales: recibir y transmitir órdenes, ejecutarlas por cuenta de terceros, y dar y ejecutar órdenes por cuenta propia.',
            'Incidentales: asesoría, gestión discrecional, colocación/suscripción de emisiones, custodia, administración de carteras, agente de pago/registro/transferencia, préstamos de valores y dinero, productos estructurados (swaps, CDS, reportos).',
            'Pueden asesorar sin licencia de asesor. Solo las casas de valores pueden hacer Forex por cuenta de clientes.',
          ] },
          { type: 'table', head: ['Requisito', 'Dato'], rows: [
            ['Capital total mínimo', 'B/.250,000 libre de gravámenes (Acuerdo 2-2011). El curso menciona B/.350,000 actualizado; Latinex exige $350,000 de capital pagado.'],
            ['Menoscabo del capital', 'Hasta 15 días calendario para ajustarlo (supervisión permanente); si no, intervención.'],
            ['Coeficiente de liquidez', '≥ 30% de los pasivos exigibles con plazo residual < 1 año.'],
            ['Activos líquidos computables', 'Efectivo/depósitos ≤ 1 año; deuda pública panameña y papeles listados ≤ 186 días; grado de inversión BBB/Baa2; corporativos ≥ BB+/Ba1.'],
            ['Grupo bancario', '35% de los depósitos en bancos fuera del grupo.'],
            ['Administración discrecional', 'Fondos propios ≥ 1 por mil de las carteras administradas.'],
            ['Junta Directiva', '≥ 5 miembros; al menos 2 con 2 años de experiencia financiera.'],
            ['Personal mínimo', 'Ejecutivo Principal, Corredor de Valores y Oficial de Cumplimiento (exclusivos, tiempo completo).'],
            ['Póliza E&O', 'Responsabilidad civil por errores y omisiones de al menos B/.1,000,000.'],
            ['Inicio de operaciones', 'Dentro de 6 meses desde la notificación de la licencia; avisar con 5 días hábiles.'],
            ['Control', '25% o más del capital con derecho a voto (la Ley presume control con MÁS del 25%). El cambio de control requiere autorización previa.'],
            ['Personas en Panamá', 'Al menos 2 con residencia permanente para recibir notificaciones.'],
          ] },
          { type: 'table', head: ['Reporte', 'Plazo'], rows: [
            ['Operaciones fuera de bolsa (valores registrados)', 'Diario; multa B/.1,000 la 1ª vez y B/.5,000 luego.'],
            ['Informe mensual de todas las operaciones (DS-1)', 'A más tardar el día 15 del mes siguiente.'],
            ['Coeficiente de liquidez (DS-2)', 'Día 15 del mes siguiente.'],
            ['Corresponsalías y custodios (DS-10)', 'Semestral: 15 de marzo y 15 de septiembre.'],
            ['EEFF interinos / auditados', 'Trimestrales (2 meses) / anuales (3 meses tras el cierre).'],
            ['Cambios al pacto social', '5 días hábiles tras su inscripción.'],
            ['Cambio de auditor', 'Notificar dentro de 15 días calendario; rotación del equipo cada 5 años.'],
            ['Confirmación al cliente', 'A más tardar el día hábil siguiente a la operación.'],
            ['Estados de cuenta', 'Al menos trimestralmente.'],
            ['Nuevas tarifas', 'Informar con 30 días de anticipación.'],
          ] },
        ],
      },
      {
        title: 'Normas de conducta y asesores de inversión',
        blocks: [
          { type: 'table', head: ['Norma', 'Contenido (Ley)'], rows: [
            ['Reserva de información (art. 65)', 'No divulgar información de clientes salvo consentimiento, a la SMV o por orden de autoridad competente.'],
            ['Trato justo y conflictos (art. 66)', 'Si actúa por cuenta propia y del cliente en la misma operación, debe informarle.'],
            ['Recomendación adecuada (art. 67)', 'Basada en objetivos, situación financiera y necesidades del cliente. No aplica a órdenes no solicitadas ni a reportes generales.'],
            ['Transacciones excesivas (art. 68)', 'Prohibido el churning en cuentas discrecionales o influenciables.'],
            ['Compartir ganancias/pérdidas (art. 69)', 'Prohibido; sí se permite compensación basada en el rendimiento de la cartera.'],
            ['Cuentas discrecionales (art. 64)', 'Con la diligencia que los hombres emplean en sus propios negocios.'],
          ] },
          { type: 'list', items: [
            'Asesor de inversiones: por remuneración asesora sobre precios o conveniencia de invertir en valores, o prepara estudios; puede asesorar en Forex y recomendar abrir cuentas.',
            'Puede administrar cuentas de clientes mantenidas con un intermediario y transmitir órdenes a casas de valores si el cliente lo autoriza, pero NO puede mantener cuentas de custodia ni ejecutar compraventas.',
            'Personal mínimo del asesor: Ejecutivo Principal, Analista y Oficial de Cumplimiento (EP y analista pueden ser la misma persona con ambas licencias).',
            'Analista = persona natural que asesora en nombre de un asesor de inversiones. Corredor = persona natural que compra/vende en nombre de una casa de valores.',
          ] },
        ],
      },
      {
        title: 'Licencias de persona natural (Acuerdo 5-2014)',
        blocks: [
          { type: 'table', head: ['Tema', 'Regla'], rows: [
            ['Licencias', 'Corredor de Valores y Analista; Ejecutivo Principal; EP de Administrador de Inversiones. El Oficial de Cumplimiento se rige por el Acuerdo 9-2001.'],
            ['Exámenes', 'Examen General Básico (corredor/analista) + Complementario para EP y para EP de Administrador. Puntaje mínimo 70%.'],
            ['Vigencia del examen', '1 año desde la publicación de la aprobación para pedir la licencia.'],
            ['Expiración', 'A los 2 años de dejar el cargo, salvo que siga en banca/valores pagando la tarifa.'],
            ['Renovación', 'Sin examen si lo aprobó dentro de los 5 años anteriores.'],
            ['Cancelación voluntaria', 'Procede a los 30 días calendario de presentada.'],
            ['Notificación de contratación/salida/ausencias > 45 días', 'Dentro de 5 días hábiles, por el Ejecutivo Principal.'],
            ['Actualización del DRA-1', 'Dentro de 5 días hábiles tras el cambio.'],
            ['Cese por fuerza mayor', 'Reemplazar en 45 días calendario (o dejar de prestar el servicio).'],
            ['Cargos', 'Una persona = un cargo; puede ocupar 2 en la misma entidad o en entidades bajo control común (no aplica al OC).'],
            ['Domicilio', 'Corredores/analistas pueden no residir en Panamá; la entidad responde solidariamente (Formulario DRA-5).'],
          ] },
          { type: 'callout', tone: 'key', text: 'Incapacidad (art. 79 Ley / art. 24 Acuerdo): condenados en los últimos 10 años por delitos contra el patrimonio, orden económico, Administración Pública, fe pública o seguridad colectiva; accionistas/directores de entidades con licencia revocada en los últimos 5 años; licencia personal revocada en los últimos 5 años; quebrados; responsables de liquidación forzosa.' },
          { type: 'list', items: [
            'Corredor/Analista: ética y transparencia, "Conozca a su Cliente", actualizar el perfil anualmente, trato justo, conocer los productos, "Recomendación Adecuada".',
            'Ejecutivo Principal: velar por el cumplimiento de la entidad, supervisar operaciones y colaboradores, firmar reportes, reportar irregularidades, pedir autorización antes de cambiar el plan de negocios.',
          ] },
        ],
      },
      {
        title: 'Emisores, ofertas públicas y OPA',
        blocks: [
          { type: 'list', items: [
            'Registro obligatorio: valores de ofertas públicas; acciones de emisores panameños con 50 o más accionistas residentes en Panamá dueños de al menos 10% del capital (salvo que 75% de los accionistas aprueben no registrar); valores listados en bolsa.',
            'Ofertas exentas: valores del Estado; de organismos internacionales en que participe el Estado; colocación privada (≤ 25 personas ofrecidas y ≤ 10 compradores en 1 año); empleados; inversionistas institucionales; traspasos corporativos.',
            'Informe anual del emisor: con EEFF auditados, a más tardar 120 días tras el cierre (el Acuerdo lo fija en 3 meses); más informes interinos.',
            'Hechos de importancia: deben divulgarse (ej.: pérdidas o ganancias ≥ 20% del patrimonio; inversiones que afecten > 25% de los activos).',
            'Prospecto: preliminar (debe decir "preliminar") o definitivo (aprobado por la SMV); sin declaraciones falsas ni omisiones.',
          ] },
          { type: 'table', head: ['OPA (Título VII)', 'Regla'], rows: [
            ['Cuándo', 'Oferta pública de compra por 25% o más del capital, o que lleve al oferente a más del 50%.'],
            ['Plazo', 'No menor de 30 días para aceptarla.'],
            ['Igualdad', 'Mismos términos y precio para todos los tenedores.'],
            ['Oferta de exclusión', 'Si el oferente llega al 75% o más, debe extenderla al resto.'],
          ] },
        ],
      },
      {
        title: 'Sociedades de inversión',
        blocks: [
          { type: 'list', items: [
            'Persona jurídica, fideicomiso o arreglo contractual que capta dinero del público vendiendo cuotas para invertirlo.',
            'Abiertas: redención periódica al valor neto; cuotas variables. Cerradas: sin redención antes de la liquidación (salvo casos extraordinarios).',
            'Estructuras: simples, paraguas (series con carteras distintas), múltiples clases, fondos de fondos.',
            'Junta directiva: al menos 20% de miembros independientes. No son independientes el administrador, asesor, custodio, oferente, auditores externos ni quien posea más del 10% de ellos.',
            'Contratos con el administrador: aprobados con voto de los directores independientes.',
            'Excluidas: SIACAP; grupos de ≤ 20 personas por pertenencia a empresa/asociación sin comercialización.',
            'Sociedad de inversión privada: cuotas no ofrecidas en Panamá; hasta 50 propietarios o solo comunicación privada.',
            'Inmobiliarias: deben valorar sus inmuebles al menos una vez al año.',
          ] },
          { type: 'callout', tone: 'warn', text: 'Los límites de diversificación, endeudamiento y liquidez de las sociedades de inversión están en el Acuerdo 5-2004, que no está en tu carpeta de material. Las preguntas sobre esos porcentajes aparecen marcadas con "Verificar".' },
        ],
      },
      {
        title: 'Prevención de BC/FT/FPADM (Acuerdo 6-2015 y Ley 23 de 2015)',
        blocks: [
          { type: 'p', text: 'Sujetos obligados financieros supervisados por la SMV: organizaciones autorreguladas, casas de valores, administradores de inversión, administradoras de fondos de pensiones y de cesantía, sociedades de inversión (incl. autoadministradas), asesores de inversión y proveedores de servicios administrativos.' },
          { type: 'table', head: ['Obligación', 'Regla'], rows: [
            ['Clasificación de clientes', 'Riesgo alto, moderado y bajo; revisar al menos 1 vez al año.'],
            ['Actualización de expedientes', 'Alto: 12 meses · Moderado: 24 meses · Bajo: 48 meses · o cuando cambie el perfil.'],
            ['Beneficiario final', 'Personas naturales con 10% o más (o derechos equivalentes). Si no se identifica: no iniciar/continuar la relación.'],
            ['Debida diligencia ampliada', 'PEP, listas, jurisdicciones de riesgo, corresponsalías, alto volumen de efectivo. Requiere aprobación de la Alta Gerencia.'],
            ['Conservación de documentos', 'Mínimo 5 años desde la terminación de la relación.'],
            ['Manual de Prevención', 'Adoptado por la Junta Directiva; revisado al menos 1 vez al año.'],
            ['Capacitación', 'Al menos 1 vez al año. Perfil del empleado actualizado anualmente.'],
            ['Comité de Ética y Cumplimiento', 'Reporta a la Junta; mín. 2 directores + el OC (con voz y voto); se reúne al menos trimestralmente.'],
            ['Comité de Auditoría', 'Mín. 3 miembros; trimestral; informa a la Junta cada semestre.'],
            ['Persona de enlace con la UAF', 'El Oficial de Cumplimiento (en su ausencia, el representante legal).'],
            ['Reporte de operación sospechosa', 'Directo a la UAF, sin aval de la Junta. Prohibido avisar al cliente (tipping-off). Exención de responsabilidad penal y civil.'],
            ['Listas', 'Si hay coincidencia: suspender transacciones y congelar preventivamente los fondos.'],
          ] },
          { type: 'list', items: [
            'Cuasi-efectivo: cheques de gerencia, certificados o de viajero, órdenes de pago al portador, giros, etc.',
            'Transacciones reportables: efectivo/cuasi-efectivo > B/.10,000, transacciones sucesivas que sumen más de B/.10,000, cambios de denominación > B/.10,000.',
            'Perfil financiero (características verificadas al abrir la cuenta) vs. perfil transaccional (contraste con la actividad real).',
          ] },
        ],
      },
      {
        title: 'Gestión Integral de Riesgos (Acuerdo 1-2026)',
        blocks: [
          { type: 'p', text: 'Acuerdo No. 1-2026 (28 de mayo de 2026): lineamientos generales para la Gestión Integral de Riesgos. Aplica a administradoras de inversiones, administradoras de fondos de pensiones y jubilaciones, casas de valores y organizaciones autorreguladas; complementa los Acuerdos 6-2015 (BC/FT), 5-2018 (TI) y 6-2018 (gobierno corporativo).' },
          { type: 'table', head: ['Concepto', 'Definición'], rows: [
            ['Apetito de riesgo', 'Nivel y tipo de riesgo que la entidad está dispuesta a asumir para lograr sus objetivos.'],
            ['Capacidad de riesgo', 'Máximo riesgo que puede asumir sin comprometer solvencia, viabilidad o continuidad.'],
            ['Tolerancia al riesgo', 'Margen aceptable de desviación respecto al apetito.'],
            ['Riesgo inherente', 'Riesgo propio de la actividad antes de controles; no se elimina, se mitiga.'],
            ['Riesgo residual', 'El que permanece después de los controles.'],
            ['Stress test', 'Impacto ante escenarios excepcionales pero posibles.'],
            ['Back testing', 'Precisión y confiabilidad de un modelo interno de medición.'],
          ] },
          { type: 'table', head: ['Línea de defensa', 'Responsable de'], rows: [
            ['1ª — Negocio', 'Identificar, gestionar y reportar sus riesgos inherentes.'],
            ['2ª — Riesgos y Cumplimiento', 'Metodologías, monitoreo y cumplimiento del apetito de riesgo.'],
            ['3ª — Auditoría Interna', 'Evaluar de forma independiente la eficacia del sistema.'],
          ] },
          { type: 'list', items: [
            'Tipos de riesgo: financieros y de valuación (crédito, contraparte, mercado —precio, tasa, cambio—, liquidez —de fondeo y de mercado—, concentración, valuación, país —transferencia, político, soberano—); operativos, tecnológicos y legales (operacional, TI, ciberseguridad, continuidad, fraude, legal, normativo, BC/FT); estratégicos y del entorno (estratégico, reputación, contagio, ASG).',
            'Manual de Gestión Integral de Riesgos: aprobado por el Comité de Riesgos, ratificado por la Junta; revisado al menos 1 vez al año.',
            'Comité de Administración de Riesgos: 1 director no involucrado en la gestión + responsable de riesgos + áreas de negocio; se reúne al menos cada 3 meses.',
            'Órgano de Gestión de Riesgos: independiente de negocios y finanzas; depende del Comité de Riesgos; no aprueba transacciones.',
            'Si se integran el Comité de Riesgos y el de Ética y Cumplimiento, la gestión de riesgos y el cumplimiento AML deben recaer en personas distintas (no aplica a SROs ni a AFP).',
          ] },
        ],
      },
      {
        title: 'Actividades prohibidas, sanciones y aspectos fiscales',
        blocks: [
          { type: 'table', head: ['Prohibición (Título XII)', 'Idea clave'], rows: [
            ['Actos fraudulentos o engañosos (246)', 'Declaraciones falsas u omisiones sobre hechos de importancia.'],
            ['Información privilegiada (247)', 'Usarla o suministrarla; responsabilidad civil hasta 3 veces la ganancia obtenida o pérdida evitada.'],
            ['Declaraciones falsas de emisores y oferentes (248–249)', 'Salvo que la contraparte conociera la falsedad.'],
            ['Registros e informes falsos a la SMV (251)', '—'],
            ['Manipulación (252)', 'Crear apariencia falsa de negociación activa o manipular precios.'],
            ['Promoción sin divulgar beneficio (253)', 'Debe revelarse que se recibe contraprestación.'],
            ['Falsificación de libros (254)', '—'],
            ['Actividades sin licencia o registro (255)', '—'],
          ] },
          { type: 'list', items: [
            'Penas (según el curso): divulgación/uso de información privilegiada 3 a 5 años de prisión; manipulación y apropiación de valores 3 a 6 años (6 a 10 si colabora un empleado); falsificación de registros 4 a 7 años (5 a 10 en regulados).',
            'Infracciones muy graves, graves y leves; multas de B/.1,000 hasta B/.1,000,000. Sanciones: amonestación pública, suspensión, revocación, remoción.',
            'Criterios para multas: gravedad, amenaza o daño, reincidencia, duración, indicios de intencionalidad y resarcimiento.',
            'Prescripción de la acción sancionadora de la SMV: 4 años desde la consumación de los hechos (art. 277, Texto Único). El curso de 2014 citaba 1 y 3 años (norma anterior).',
            'Fiscal: ganancias de capital en valores registrados enajenados por bolsa no gravables; intereses de valores registrados: 5% de ISR, EXENTOS si se colocan a través de bolsa; valores registrados exentos del impuesto de timbre.',
          ] },
        ],
      },
    ],
  },
  {
    id: 'niif',
    letter: 'L',
    title: 'NIIF y Contabilidad Financiera',
    short: 'NIIF y razones',
    color: '#64748b',
    summary: 'Estados financieros, razones de liquidez, rentabilidad, actividad, endeudamiento y bursátiles; NIIF 7, NIIF 9, NIC 39 y valor razonable.',
    lessons: [
      {
        title: 'Estados financieros',
        blocks: [
          { type: 'list', items: [
            'Balance general: situación a una fecha. Activos = Pasivos + Patrimonio.',
            'Estado de resultados: dinámico (un período). Ventas − costo = utilidad bruta − gastos operativos = EBITDA − depreciación y amortización = EBIT − intereses = utilidad antes de impuestos − impuestos = utilidad neta.',
            'Estado de cambios en el patrimonio: aumentos de capital, reservas, cambios de criterio contable, errores.',
            'Estado de flujo de efectivo: actividades de operación, inversión y financiamiento. El efectivo sobrante de las tres es el flujo de caja neto.',
            'Notas a los estados financieros.',
          ] },
          { type: 'callout', tone: 'tip', text: 'Emitir bonos aumenta el efectivo (activo circulante y capital de trabajo), los pasivos y los activos totales; NO cambia el patrimonio. Un dividendo en efectivo reduce las utilidades retenidas y el capital de trabajo.' },
        ],
      },
      {
        title: 'Razones financieras',
        blocks: [
          { type: 'table', head: ['Razón', 'Fórmula', 'Mide'], rows: [
            ['Razón corriente', 'Activo circulante / Pasivo circulante', 'Liquidez'],
            ['Prueba ácida', '(Activo circ. − Inventarios) / Pasivo circ.', 'Liquidez inmediata'],
            ['Capital de trabajo', 'Activo circ. − Pasivo circ.', 'Liquidez'],
            ['Margen neto', 'Utilidad neta / Ventas', 'Rentabilidad'],
            ['Margen bruto', '(Ventas − Costo de ventas) / Ventas', 'Rentabilidad'],
            ['ROE', 'Utilidad neta / Patrimonio', 'Rentabilidad del accionista'],
            ['ROA', 'Utilidad neta / Activos totales', 'Rentabilidad de los activos'],
            ['Rotación de cuentas por cobrar', 'Ventas / CxC promedio', 'Actividad'],
            ['Rotación de activos', 'Ventas / Activos promedio', 'Actividad'],
            ['Razón de endeudamiento', 'Pasivo total / Activo total', 'Endeudamiento'],
            ['Apalancamiento financiero', 'Pasivo total / Patrimonio', 'Endeudamiento'],
            ['Activos LP / Pasivos LP', '—', 'Solvencia'],
            ['Cobertura de intereses', '(UAI + Gastos financieros) / Gastos financieros', 'Cobertura'],
            ['UPA (EPS)', '(Utilidad neta − dividendos preferentes) / Acciones comunes', 'Bursátil'],
            ['P/U (P/E)', 'Precio / UPA', 'Bursátil'],
            ['Rendimiento por utilidades', 'UPA / Precio', 'Bursátil'],
            ['Rendimiento del dividendo', 'Dividendo anual / Precio', 'Bursátil'],
            ['Payout', 'Dividendos / Utilidad neta', 'Bursátil'],
            ['Bolsa/Libro', 'Precio (o cap. bursátil) / Valor en libros', 'Bursátil'],
          ] },
          { type: 'callout', tone: 'key', text: 'EBIT mide la eficiencia después de todos los gastos operativos, excluyendo intereses e impuestos. EBITDA excluye además depreciación y amortización.' },
        ],
      },
      {
        title: 'NIIF, NIC y valor razonable',
        blocks: [
          { type: 'list', items: [
            'NIIF (IFRS): emitidas por el IASB. Comprenden NIIF, NIC e interpretaciones CINIIF (IFRIC). Objetivo: información financiera comparable, transparente y útil para decisiones.',
            'NIIF 7: información a revelar sobre instrumentos financieros (relevancia y naturaleza/alcance de riesgos: crédito, liquidez, mercado); cualitativa y cuantitativa.',
            'Instrumento financiero: contrato que origina un activo financiero en una entidad y un pasivo o instrumento de patrimonio en otra.',
            'Reconocimiento inicial: valor razonable + costos de transacción (salvo a valor razonable con cambios en resultados).',
            'NIC 39 (en su mayoría derogada por NIIF 9): préstamos y CxC, mantenidas al vencimiento, a valor razonable con cambios en resultados, disponibles para la venta.',
            'NIIF 9 (vigente desde el 1 de enero de 2018): clasificación y medición, deterioro (pérdida esperada) y coberturas. Test SPPI: solo pagos de principal e intereses.',
            'NIC 36: deterioro del valor de los activos.',
          ] },
          { type: 'table', head: ['Jerarquía de valor razonable', 'Insumos'], rows: [
            ['Nivel 1', 'Precios cotizados en mercados activos (acciones y bonos cotizados, fondos).'],
            ['Nivel 2', 'Técnicas con variables observables en el mercado.'],
            ['Nivel 3', 'Técnicas con variables NO observables.'],
          ] },
        ],
      },
    ],
  },
];

export const TOPIC_BY_ID = Object.fromEntries(TOPICS.map((t) => [t.id, t]));
