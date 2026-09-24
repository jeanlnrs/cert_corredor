// Banco adicional de preguntas de práctica, redactadas a partir del material de estudio.
// `src` indica el artículo o documento de donde sale la respuesta.

const RAW = {
  legal: [
    ['¿Cuántos miembros con derecho a voz y voto integran la Junta Directiva de la SMV?', ['5', '7', '9', '3'], 1, '5 nombrados por el Órgano Ejecutivo + 1 designado por la Superintendencia de Bancos + 1 por la Superintendencia de Seguros y Reaseguros.', 'Ley, art. 6'],
    ['¿Cuál es el quórum para las reuniones de la Junta Directiva de la SMV?', ['3 miembros', '4 miembros', '5 miembros', 'La mayoría absoluta de 7'], 1, 'Se requiere la presencia de al menos 4 miembros y, en ese caso, 4 votos para aprobar.', 'Ley, art. 9'],
    ['Los directores designados por la SBP y la SSRP ejercen su cargo por:', ['1 año', '2 años prorrogables', '5 años', '10 años'], 1, 'Los otros cinco directores tienen períodos de 5 años (escalonados).', 'Ley, arts. 6 y 8'],
    ['El Superintendente del Mercado de Valores es nombrado por un período de:', ['5 años, prorrogable por una sola vez', '5 años, prorrogable indefinidamente', '7 años', '4 años, coincidiendo con el período presidencial'], 0, 'Es funcionario de tiempo completo, representante legal, y requiere ratificación de la Asamblea Nacional.', 'Ley, art. 12'],
    ['En ausencia temporal del Superintendente, la representación legal de la SMV recae en:', ['El Secretario General', 'El Ministro de Economía y Finanzas', 'El presidente de la Junta Directiva', 'El director jurídico'], 2, 'La Junta designa además un superintendente interino entre los funcionarios.', 'Ley, art. 12'],
    ['Las opiniones de la SMV:', ['Las adopta la Junta Directiva y son de aplicación individual', 'Las adopta el Superintendente, expresan la posición administrativa y no pueden contravenir acuerdos de la Junta', 'No son vinculantes', 'Solo pueden emitirse a solicitud de parte'], 1, 'Son vinculantes, de aplicación general; pueden emitirse de oficio o a solicitud de parte y deben publicarse en Gaceta Oficial.', 'Ley, art. 19'],
    ['Las resoluciones emitidas por el Superintendente son:', ['Solo de aplicación individual', 'De aplicación general', 'Iguales a los acuerdos', 'Inapelables'], 0, 'Las resoluciones de la Junta Directiva pueden ser individuales o generales; las del Superintendente solo individuales.', 'Ley, art. 19'],
    ['El plazo para interponer recurso de reconsideración o apelación contra una resolución del Superintendente es:', ['3 días hábiles', '5 días hábiles', '10 días hábiles', '30 días calendario'], 1, 'Cinco días hábiles desde la notificación. La apelación se resuelve ante la Junta Directiva y agota la vía gubernativa.', 'Ley, art. 22'],
    ['Como regla general, los recursos contra decisiones del Superintendente se conceden en efecto:', ['Devolutivo', 'Suspensivo', 'Diferido', 'Ninguno'], 1, 'Excepciones con efecto devolutivo: perjuicio grave e inminente al público, procesos de intervención/liquidación o suspensión de operaciones, y decisiones sobre pruebas.', 'Ley, art. 23'],
    ['¿Qué entidades NO quedan sujetas a la fiscalización de la SMV?', ['Casas de valores', 'Bancos que no son casas de valores y empresas financieras', 'Asesores de inversión', 'Centrales de valores'], 1, 'Los bancos solo quedan sujetos cuando actúan como casas de valores.', 'Ley, art. 4'],
    ['En sus relaciones con el Órgano Ejecutivo, la SMV actúa por conducto de:', ['El Ministerio de Comercio e Industrias', 'El Ministerio de Economía y Finanzas', 'La Presidencia de la República', 'La Contraloría General'], 1, 'Relaciones intergubernamentales a través del MEF.', 'Ley, art. 28'],
    ['Tarifa anual de supervisión para un corredor de valores o analista:', ['B/.100', 'B/.150', 'B/.200', 'B/.500'], 2, 'La licencia cuesta B/.500 (registro) y la supervisión anual es B/.200.', 'Ley, art. 26'],
    ['Tarifa de supervisión anual de una casa de valores:', ['0.0025% del monto anual de negociaciones (mín. 15,000; máx. 100,000)', 'B/.10,000 fija', '0.015% del valor de mercado', 'B/.7,500 fija'], 0, 'El asesor de inversiones paga B/.7,500 fija.', 'Ley, art. 26'],
    ['Tarifa por derecho a examen para optar por la licencia de corredor de valores y analista:', ['B/.50', 'B/.100', 'B/.200', 'B/.500'], 1, 'B/.100 por cada examen aplicado.', 'Ley, art. 25'],
    ['¿Cuál es el puntaje mínimo para aprobar el Examen General Básico?', ['60%', '65%', '70%', '75%'], 2, 'También se exige 70% en los exámenes complementarios.', 'Acuerdo 5-2014, art. 7'],
    ['Una vez aprobado el examen, ¿cuánto tiempo se tiene para solicitar la licencia?', ['6 meses', '1 año', '2 años', '5 años'], 1, 'Vigencia de 1 año desde que se publica la aprobación en la web de la SMV.', 'Acuerdo 5-2014, art. 10'],
    ['¿Qué exámenes debe aprobar quien quiere la licencia de Ejecutivo Principal?', ['Solo el Examen Complementario', 'El Examen General Básico y el Complementario de Ejecutivo Principal', 'Solo el Examen General Básico', 'El examen de Oficial de Cumplimiento'], 1, 'El corredor con licencia que luego pide la de EP solo presenta el Complementario, si sigue ejerciendo.', 'Acuerdo 5-2014, arts. 7 y 10'],
    ['La SMV exceptúa del examen en una renovación de licencia a quien lo aprobó dentro de los últimos:', ['2 años', '3 años', '5 años', '10 años'], 2, 'Cinco años anteriores a la solicitud de renovación.', 'Acuerdo 5-2014, art. 15'],
    ['La cancelación voluntaria de una licencia de persona natural procede transcurridos:', ['15 días hábiles', '30 días calendario', '45 días calendario', '60 días'], 1, 'Requiere solicitud, pago de la tarifa (B/.150) y declaración jurada notarial de no tener compromisos pendientes con inversionistas.', 'Acuerdo 5-2014, art. 16'],
    ['El Ejecutivo Principal debe notificar a la SMV el inicio o terminación de labores de personal con licencia dentro de:', ['24 horas', '5 días hábiles', '15 días calendario', '30 días'], 1, 'También deben notificarse las ausencias mayores de 45 días calendario, indicando el reemplazo.', 'Acuerdo 5-2014, art. 20'],
    ['Si cesa por fuerza mayor el único corredor de una casa de valores, ésta debe reemplazarlo en un plazo no mayor de:', ['15 días calendario', '30 días calendario', '45 días calendario', '90 días'], 2, 'O debe dejar de prestar los servicios para los que se requería. El Superintendente puede prorrogar.', 'Acuerdo 5-2014, art. 22'],
    ['Una persona con licencia debe actualizar su formulario DRA-1 ante un cambio dentro de:', ['5 días hábiles', '10 días hábiles', '30 días', 'Al renovar la licencia'], 0, 'Obligación de mantener actualizada la información suministrada.', 'Acuerdo 5-2014, art. 21'],
    ['No puede obtener licencia de corredor quien haya sido condenado por delitos contra el patrimonio económico en los últimos:', ['5 años', '7 años', '10 años', '15 años'], 2, 'Para revocaciones de licencia (personal o de la entidad donde fue accionista/director/gerente) el plazo es 5 años.', 'Ley, art. 79'],
    ['Un corredor de valores con domicilio fuera de Panamá:', ['No puede obtener licencia', 'Puede tenerla; la entidad para la que labora responde solidariamente por sus sanciones', 'Solo puede atender clientes panameños', 'No paga tarifa de supervisión'], 1, 'Debe presentarse el formulario DRA-5 (carta de responsabilidad solidaria) y comprometerse a no ejercer en o desde Panamá.', 'Ley, art. 76 / Acuerdo 5-2014'],
    ['Por regla general, una persona natural con licencia puede ocupar:', ['Cargos ilimitados', 'Un cargo, o dos en la misma entidad o en entidades con control común', 'Solo un cargo sin excepción', 'Tres cargos'], 1, 'Esta flexibilidad no aplica al Oficial de Cumplimiento.', 'Acuerdo 5-2014, art. 6'],
    ['El personal mínimo con licencia de una casa de valores es:', ['Ejecutivo Principal y Oficial de Cumplimiento', 'Ejecutivo Principal, Corredor de Valores y Oficial de Cumplimiento', 'Corredor de Valores y Analista', 'Ejecutivo Principal, Analista y Oficial de Cumplimiento'], 1, 'El asesor de inversiones requiere EP, Analista y OC.', 'Acuerdo 5-2014, art. 5'],
    ['¿Qué responsabilidad corresponde al Corredor de Valores según el Acuerdo 5-2014?', ['Firmar los estados financieros', 'Actualizar el perfil del cliente anualmente o ante cambios significativos', 'Aprobar el plan de negocios', 'Designar al oficial de cumplimiento'], 1, 'También: "Conozca a su Cliente", trato justo, conocer los productos y la "Recomendación Adecuada".', 'Acuerdo 5-2014, art. 17'],
    ['Las casas de valores tienen como objeto exclusivo el negocio de casa de valores, salvo:', ['Las que sean bancos o administradores de inversiones', 'Las que tengan más de 10 años', 'Las extranjeras', 'Ninguna excepción'], 0, 'Los bancos con licencia de casa de valores también pueden ejercer la actividad fiduciaria con su licencia.', 'Ley, art. 54'],
    ['¿Cuál NO es una actividad principal de una casa de valores?', ['Recibir y transmitir órdenes', 'Ejecutar órdenes por cuenta de terceros', 'Dar y ejecutar órdenes por cuenta propia', 'Manejo de cuentas de custodia'], 3, 'La custodia es una actividad incidental, igual que la asesoría o los préstamos de valores.', 'Acuerdo 2-2011, art. 3'],
    ['Si el capital total mínimo de una casa de valores sufre menoscabo, la SMV otorga para ajustarlo un máximo de:', ['5 días hábiles', '15 días calendario', '30 días calendario', '90 días'], 1, 'Durante el plazo queda bajo supervisión permanente; si no cumple, se aplica la intervención.', 'Acuerdo 2-2011, art. 5'],
    ['Para el coeficiente de liquidez, los valores de deuda pública panameña computables deben vencer en no más de:', ['90 días', '180 días', '186 días', '365 días'], 2, 'También los papeles comerciales listados en bolsas panameñas con vencimiento ≤ 186 días.', 'Acuerdo 2-2011, art. 6'],
    ['Una casa de valores de un grupo bancario debe mantener en bancos fuera de su grupo al menos:', ['10% de su efectivo y depósitos', '25%', '35%', '50%'], 2, '35% del efectivo y depósitos a la vista o a plazo ≤ 1 año.', 'Acuerdo 2-2011, art. 6'],
    ['La Junta Directiva de una casa de valores debe tener:', ['Al menos 3 miembros', 'Al menos 5 miembros, 2 con 2 años de experiencia financiera', 'Al menos 7 miembros', 'Al menos 5 miembros, todos independientes'], 1, 'Todos de reconocida honorabilidad.', 'Acuerdo 2-2011, art. 9'],
    ['Monto mínimo de la póliza de Responsabilidad Civil por Errores y Omisiones de una casa de valores:', ['B/.250,000', 'B/.500,000', 'B/.1,000,000', 'B/.5,000,000'], 2, 'Debe mantenerse vigente hasta la cancelación de la licencia; la SMV puede exigir un monto mayor.', 'Acuerdo 2-2011, art. 8'],
    ['Multa por no comunicar la primera vez las operaciones fuera de bolsa sobre valores registrados:', ['B/.500', 'B/.1,000', 'B/.5,000', 'B/.10,000'], 1, 'Reincidencia dentro de 1 año: B/.5,000.', 'Acuerdo 2-2011, art. 17'],
    ['El informe mensual globalizado de todas las operaciones de los corredores (DS-1) se entrega:', ['El último día del mes', 'A más tardar el día 15 del mes siguiente', 'Dentro de los 10 días hábiles', 'Trimestralmente'], 1, 'Si el día 15 es inhábil, se corre al siguiente día hábil.', 'Acuerdo 2-2011, art. 17'],
    ['El reporte de corresponsalías y custodios (DS-10) se presenta:', ['Mensualmente', 'Semestralmente, el 15 de marzo y el 15 de septiembre', 'Anualmente en enero', 'Solo cuando se abre una nueva corresponsalía'], 1, 'Tiene carácter de declaración jurada, firmada por el Ejecutivo Principal.', 'Acuerdo 2-2011, art. 21-A'],
    ['Los valores negociados a través de corresponsalía NO se consideran ofrecidos en Panamá si la casa de valores:', ['Los anuncia por televisión', 'Solicita activamente órdenes', 'Informa que no están registrados en la SMV y la compraventa se perfecciona fuera de Panamá', 'Los vende a más de 25 personas'], 2, 'Además, no debe ofrecerlos por medios públicos ni solicitar activamente órdenes en Panamá.', 'Ley, art. 58'],
    ['Las acciones de una casa de valores deben emitirse en forma:', ['Al portador', 'Nominativa', 'Indistinta', 'Desmaterializada únicamente'], 1, 'Además, sus directores no pueden ser personas jurídicas.', 'Ley, art. 56 / Acuerdo 2-2011'],
    ['Una casa de valores que en una misma transacción actúa por cuenta de un cliente y por cuenta propia debe:', ['Abstenerse siempre', 'Informárselo al cliente', 'Pedir autorización a la SMV', 'Cobrar doble comisión'], 1, 'Norma de conflictos de interés y trato justo.', 'Ley, art. 66'],
    ['La obligación de "recomendación adecuada" NO aplica a:', ['Recomendaciones a clientes nuevos', 'La ejecución de órdenes no solicitadas por la casa de valores', 'Cuentas discrecionales', 'Clientes institucionales únicamente'], 1, 'Tampoco aplica a reportes informativos generales que recomienden comprar o vender.', 'Ley, art. 67'],
    ['¿Cuál acuerdo está PERMITIDO entre una casa de valores y su cliente?', ['Compartir las ganancias o pérdidas del cliente', 'Indemnizar al cliente contra pérdidas', 'Compensación basada en el rendimiento de la cartera', 'Garantizar un rendimiento mínimo'], 2, 'Compartir ganancias/pérdidas o indemnizar pérdidas está prohibido.', 'Ley, art. 69'],
    ['La actividad Forex por cuenta de clientes solo puede ser realizada por:', ['Bancos', 'Casas de cambio', 'Casas de valores', 'Asesores de inversión'], 2, 'Excepciones: intercambio por cuenta propia, tesorerías bancarias, operaciones de comercio exterior de bancos, casas de cambio y remesas.', 'Ley, arts. 72-73'],
    ['Un asesor de inversiones NO puede:', ['Preparar y publicar estudios sobre valores', 'Asesorar en Forex', 'Mantener cuentas de custodia', 'Recomendar abrir una cuenta en una casa de valores'], 2, 'Puede administrar cuentas mantenidas con un intermediario y transmitir órdenes autorizadas.', 'Ley, art. 74'],
    ['¿Qué es una colocación privada exenta de registro?', ['Oferta a no más de 25 personas y adquirida por no más de 10 en un año', 'Oferta a no más de 50 personas', 'Oferta a inversionistas extranjeros', 'Oferta a no más de 100 personas en 2 años'], 0, 'Si se supera, es oferta pública y requiere registro.', 'Ley, art. 129 / curso legal'],
    ['Están exentos de registro los valores:', ['Emitidos o garantizados por el Estado panameño', 'De cualquier empresa extranjera', 'Listados en bolsa', 'De sociedades de inversión'], 0, 'También los de organismos internacionales en que participe el Estado.', 'Ley, art. 129'],
    ['Deben registrarse las acciones de un emisor panameño que tenga al cierre fiscal:', ['25 o más accionistas', '50 o más accionistas residentes en Panamá dueños de al menos 10% del capital pagado', '100 accionistas', '10 accionistas extranjeros'], 1, 'No es obligatorio si el 75% de los accionistas aprueba seguir sin registro.', 'Curso legal'],
    ['Si una OPA resulta en que el oferente controle el 75% o más de las acciones comunes:', ['La OPA se anula', 'Debe extender la oferta al resto de las acciones (oferta de exclusión)', 'Debe vender el exceso', 'Debe pedir autorización a la Asamblea'], 1, 'En los mismos términos y condiciones.', 'Ley, art. 145'],
    ['El uso indebido de información privilegiada genera responsabilidad civil hasta por:', ['El monto de la ganancia', 'Dos veces la ganancia', 'Tres veces la ganancia realizada o la pérdida evitada', 'B/.1,000,000'], 2, 'En este caso no se permite la rescisión de los contratos.', 'Ley, art. 256'],
    ['La acción sancionatoria de la SMV prescribe (Texto Único vigente) a los:', ['1 año', '3 años', '4 años desde la consumación de los hechos', '10 años'], 2, 'Se interrumpe individualmente con la notificación de la resolución que ordena el procedimiento sancionador.', 'Ley, art. 277'],
    ['Los intereses de valores registrados en la SMV NO colocados a través de bolsa pagan ISR a una tasa única de:', ['0%', '5% (retenido)', '10%', '25%'], 1, 'Si se colocan por bolsa u otro mercado organizado, están exentos.', 'Ley, art. 335'],
    ['Las ganancias de capital por venta de valores registrados en la SMV son no gravables si la venta se realiza:', ['A través de una bolsa de valores u otro mercado organizado', 'Fuera de bolsa', 'A un familiar', 'En el extranjero'], 0, 'También en fusiones o reorganizaciones en que se reciban solo acciones.', 'Ley, art. 334'],
    ['¿Cuáles son los sujetos obligados financieros supervisados por la SMV en materia de BC/FT?', ['Solo casas de valores', 'Casas de valores, SROs, administradores, AFP, sociedades de inversión, asesores y proveedores de servicios administrativos', 'Solo bancos', 'Solo emisores registrados'], 1, 'Son nueve categorías de sujetos obligados financieros.', 'Acuerdo 6-2015, art. 3'],
    ['¿Cada cuánto deben actualizarse los expedientes de clientes de riesgo MODERADO?', ['12 meses', '24 meses', '36 meses', '48 meses'], 1, 'Alto: 12 meses; bajo: 48 meses; o de inmediato si cambia el perfil.', 'Acuerdo 6-2015, art. 25'],
    ['Categorías mínimas de clasificación de riesgo de clientes:', ['Alto y bajo', 'Alto, moderado y bajo', 'Crítico, alto, medio y bajo', 'Aprobado o rechazado'], 1, 'La clasificación se revisa al menos una vez al año.', 'Acuerdo 6-2015, art. 6'],
    ['Para identificar beneficiarios finales de personas jurídicas se consideran las personas naturales con participación de:', ['5% o más', '10% o más', '25% o más', '51% o más'], 1, 'Si no se puede identificar al beneficiario final, no se debe iniciar o continuar la relación.', 'Acuerdo 6-2015, art. 9'],
    ['La apertura de cuenta de un cliente de alto riesgo (ej. PEP) debe ser aprobada por:', ['El corredor de valores', 'La Alta Gerencia', 'La SMV', 'La UAF'], 1, 'Se aplica debida diligencia ampliada o reforzada.', 'Acuerdo 6-2015, arts. 17-18'],
    ['El Comité de Ética y Cumplimiento de una casa de valores debe reunirse al menos:', ['Mensualmente', 'Trimestralmente', 'Semestralmente', 'Anualmente'], 1, 'Integrado por mínimo 2 miembros de la Junta Directiva y el Oficial de Cumplimiento (voz y voto); reporta a la Junta.', 'Acuerdo 6-2015, art. 19'],
    ['¿Quién es la persona de enlace con la UAF?', ['El Ejecutivo Principal', 'El Oficial de Cumplimiento (en su ausencia, el representante legal)', 'El presidente de la Junta', 'El auditor interno'], 1, 'Los reportes se envían directo a la UAF, sin aval de la Junta Directiva.', 'Acuerdo 6-2015, arts. 29-30'],
    ['Tras enviar un reporte de operación sospechosa, el sujeto obligado:', ['Debe informar al cliente', 'No puede informar al cliente ni a terceros', 'Debe cerrar la cuenta de inmediato', 'Debe publicarlo'], 1, 'Prohibición de "tipping-off". Además, hay exención de responsabilidad penal y civil por reportar.', 'Acuerdo 6-2015, art. 33'],
    ['Si un cliente coincide con una lista internacional de terrorismo, el sujeto obligado debe:', ['Pedirle una explicación', 'Suspender toda transacción y congelar preventivamente sus fondos', 'Cerrar la cuenta y devolver los fondos', 'Esperar 30 días'], 1, 'Conforme a la Ley 23 de 2015.', 'Acuerdo 6-2015, art. 22'],
    ['El Manual de Prevención debe ser adoptado y revisado como mínimo una vez al año por:', ['El Oficial de Cumplimiento', 'La Junta Directiva', 'La SMV', 'El auditor externo'], 1, 'Y debe estar a disposición de la SMV.', 'Acuerdo 6-2015, art. 27'],
    ['El Comité de Auditoría de un sujeto obligado debe tener como mínimo:', ['2 miembros', '3 miembros', '5 miembros', '7 miembros'], 1, 'Se reúne trimestralmente y reporta a la Junta cada semestre.', 'Acuerdo 6-2015, art. 35'],
    ['¿A qué entidades aplica el Acuerdo 1-2026 sobre Gestión Integral de Riesgos?', ['Solo bancos', 'Administradoras de inversiones, AFP, casas de valores y organizaciones autorreguladas', 'Solo emisores', 'Asesores de inversión únicamente'], 1, 'A las demás entidades se les recomienda usarlo como guía.', 'Acuerdo 1-2026, art. 1'],
    ['En el modelo de tres líneas de defensa, la tercera línea es:', ['El área de negocio', 'Riesgos y cumplimiento', 'Auditoría interna', 'La Junta Directiva'], 2, '1ª negocio; 2ª riesgos y cumplimiento; 3ª auditoría interna (evaluación independiente).', 'Acuerdo 1-2026, art. 5'],
    ['El margen aceptable de desviación respecto al apetito de riesgo se denomina:', ['Capacidad de riesgo', 'Tolerancia al riesgo', 'Riesgo residual', 'Calibración'], 1, 'La capacidad es el máximo riesgo sin comprometer la solvencia.', 'Acuerdo 1-2026, art. 3'],
    ['El riesgo que permanece después de aplicar todos los controles es el:', ['Riesgo inherente', 'Riesgo residual', 'Riesgo sistémico', 'Riesgo de contagio'], 1, 'El inherente es el propio de la actividad antes de controles.', 'Acuerdo 1-2026, art. 3'],
    ['Las pruebas que evalúan la precisión de un modelo interno de medición de riesgos son:', ['Stress test', 'Back testing', 'Calibración', 'Auditoría externa'], 1, 'El stress test evalúa escenarios excepcionales pero posibles.', 'Acuerdo 1-2026, art. 3'],
    ['El Comité de Administración de Riesgos debe reunirse al menos:', ['Mensualmente', 'Cada 3 meses', 'Cada 6 meses', 'Una vez al año'], 1, 'Levanta actas que la SMV puede requerir en cualquier momento.', 'Acuerdo 1-2026, art. 13'],
    ['El Manual de Gestión Integral de Riesgos es aprobado por ___ y ratificado por ___:', ['La SMV / la Junta', 'El Comité de Administración de Riesgos / la Junta Directiva', 'El Ejecutivo Principal / el Comité', 'La auditoría interna / la SMV'], 1, 'Se revisa al menos una vez al año o ante cambios sustanciales.', 'Acuerdo 1-2026, arts. 9 y 15'],
    ['El riesgo de que los deudores de un país no puedan pagar en moneda extranjera por restricciones a la transferencia de divisas es el:', ['Riesgo soberano', 'Riesgo de transferencia', 'Riesgo político', 'Riesgo de liquidez de mercado'], 1, 'Forma parte del riesgo país.', 'Acuerdo 1-2026, art. 7'],
    ['El Órgano de Gestión de Riesgos:', ['Aprueba las transacciones de negocio', 'Depende del área de finanzas', 'Es independiente de negocios, operaciones y finanzas y depende del Comité de Riesgos', 'Lo ejerce el Oficial de Cumplimiento'], 2, 'Puede ser una gerencia, unidad, persona natural o tercero.', 'Acuerdo 1-2026, art. 16'],
    ['El primer antecedente de regulación del mercado de valores en Panamá fue:', ['Decreto Ley 1 de 1999', 'Decreto de Gabinete 247 de 1970', 'Ley 67 de 2011', 'Ley 23 de 2015'], 1, 'Creó la primera Comisión Nacional de Valores, con 5 miembros.', 'Curso legal'],
    ['La Superintendencia del Mercado de Valores fue creada por:', ['Decreto Ley 1 de 1999', 'Ley 67 de 2011', 'Ley 66 de 2016', 'Decreto de Gabinete 30 de 1972'], 1, 'Reemplazó a la Comisión Nacional de Valores.', 'Curso legal'],
  ],
  local: [
    ['La Bolsa de Valores de Panamá (hoy Latinex) fue fundada en:', ['1970', '1990', '1997', '1999'], 1, 'Inició con 8 puestos de bolsa. Latinclear se creó en 1997.', 'Curso'],
    ['¿Qué sistema de negociación utiliza la BVP (Latinex)?', ['Nasdaq Matching Engine', 'XETRA', 'INSTINET', 'Piso de remates a viva voz'], 0, 'Sustituyó la presencia física de los corredores en el corro.', 'Curso'],
    ['Capital pagado mínimo para ser Miembro Titular de la BVP:', ['$150,000', '$250,000', '$350,000', '$1,000,000'], 2, 'Además: licencia de casa de valores, EP, corredor y OC, pólizas de Latinclear.', 'Curso'],
    ['Beneficio fiscal de emitir a través de la BVP frente a un préstamo bancario:', ['Ahorro del FECI (1%)', 'Exención del ITBMS', 'Exención de todo impuesto', 'Deducción doble de intereses'], 0, 'El FECI es una sobretasa de 1% a préstamos bancarios mayores de $5,000.', 'Curso'],
    ['Tipos de miembros de la BVP:', ['Titular, Asociado y Operador Remoto', 'Principal y Secundario', 'Nacional y Extranjero', 'Corredor y Dealer'], 0, '—', 'Curso'],
    ['En el proceso de emisión, ¿quién aprueba el prospecto informativo?', ['La bolsa de valores', 'Latinclear', 'La SMV', 'El puesto de bolsa'], 2, 'Si no lo aprueba, solicita correcciones.', 'Curso'],
    ['La casa de valores que regularmente publica cotizaciones competitivas de compra y venta y está dispuesta a operar a esos precios es un:', ['Especialista', 'Creador de mercado', 'Suscriptor', 'Agente de pago'], 1, 'Las SRO fijan sus obligaciones y beneficios.', 'Acuerdo 2-2011, art. 18'],
  ],
  capitales: [
    ['Un bono de $1,000 con cupón 10% se compra a 92% y vence en 10 años. ¿YTM aproximado?', ['10.00%', '10.87%', '11.25%', '12.22%'], 2, '(100 + 80/10) / ((1,000 + 920)/2) = 108 / 960 = 11.25%.', 'Curso', true],
    ['Un bono de $1,000 con cupón 10% se compra a 92%, vence en 10 años y tiene call a 101% en el año 5. ¿YTC aproximado (asumiendo que lo llaman en el año 5)?', ['11.25%', '12.22%', '10.87%', '13.00%'], 1, '(100 + 90/5) / ((1,010 + 920)/2) = 118 / 965 = 12.22%.', 'Curso', true],
    ['Rendimiento corriente de un bono cupón 10% comprado a 92%:', ['10.00%', '10.87%', '11.25%', '9.20%'], 1, '100 / 920 = 10.87%.', 'Curso', true],
    ['Cupón corrido al 15 de marzo de un bono de $1,000, 8% anual, pago trimestral (último pago 31/12), base 30/360:', ['$16.22', '$16.44', '$16.67', '$20.00'], 2, 'Días 30/360 = 30 + 30 + 15 = 75 → 1,000 × 8% × 75/360 = 16.67. (Actual/360 = 16.44; Actual/365 = 16.22.)', 'Curso', true],
    ['¿Qué rendimiento representa el peor escenario entre YTM, YTC y YTP?', ['Rendimiento nominal', 'Rendimiento corriente', 'YTW (yield to worst)', 'Rendimiento real'], 2, '—', 'Curso'],
    ['Letras del Tesoro de un gobierno vencen en:', ['Hasta 1 año', '1 a 10 años', '10 a 30 años', 'Más de 30 años'], 0, 'Notas: 1–10 años; bonos: 10–30 años; perpetuos: > 30 años.', 'Curso'],
    ['En Panamá, los intereses de los bonos se pagan usualmente en forma:', ['Anual', 'Semestral', 'Trimestral', 'Mensual'], 2, 'Semestral en EE.UU., anual en Europa.', 'Curso'],
    ['Split 3:2 de 1,000,000 acciones a $50. Nuevo precio y acciones:', ['$33.33 y 666,667', '$75.00 y 666,667', '$33.33 y 1,500,000', '$75.00 y 1,500,000'], 2, 'Acciones × 3/2 = 1,500,000; precio × 2/3 = $33.33.', 'Curso', true],
    ['Split inverso 3:20 de 15,000,000 acciones a $0.50. Resultado:', ['$0.075 y 100,000,000', '$3.33 y 2,250,000', '$0.075 y 2,250,000', '$3.33 y 100,000,000'], 1, 'Acciones × 3/20 = 2,250,000; precio × 20/3 = $3.33.', 'Curso', true],
    ['Activos $30MM, pasivos $18MM, 4MM de acciones. Valor en libros por acción:', ['$3.00', '$4.50', '$7.50', '$12.00'], 0, '(30 − 18) / 4 = $3.', 'Curso', true],
    ['Acción comprada a $100, se espera venderla en un año a $110 con dividendo de $5. Rentabilidad esperada:', ['10%', '5%', '15%', '11%'], 2, '(5 + 110 − 100) / 100 = 15% (5% dividendo + 10% precio).', 'Curso', true],
    ['Un bono convertible con precio de conversión $40 cotiza a 102%. Su precio de paridad es:', ['$40.00', '$40.80', '$25.00', '$41.20'], 1, 'Factor 25 → $1,020 / 25 = $40.80. Convertir solo si la acción vale más.', 'Curso', true],
    ['Con votación acumulativa, un accionista con 100 acciones y 2 directores por elegir puede:', ['Dar 100 votos a cada candidato únicamente', 'Asignar los 200 votos a un solo candidato', 'Emitir solo 100 votos', 'Votar solo por uno'], 1, 'Reglamentaria: 100 a cada uno. Acumulativa: 200 como desee.', 'Curso'],
    ['Las acciones preferentes:', ['Tienen vencimiento', 'Tienen derecho a voto pleno', 'Pagan dividendo fijo y tienen prioridad sobre las comunes', 'Su precio se mueve sobre todo con las utilidades'], 2, 'No vencen y su precio se mueve más con las tasas de interés.', 'Curso'],
    ['Un ADR es:', ['Un bono de agencia de EE.UU.', 'Un certificado emitido por un banco de EE.UU. que representa acciones de una empresa extranjera', 'Un derivado de tasas', 'Un fondo indexado'], 1, 'Se negocian en bolsa y OTC.', 'Curso'],
    ['Un ETF:', ['Es un fondo cerrado sin cotización', 'Replica un índice y se negocia en bolsa en tiempo real', 'Garantiza rendimiento', 'Solo invierte en bonos'], 1, 'Gestión pasiva.', 'Curso'],
    ['Comisión anual por mercadeo y distribución de un fondo mutuo (0.25%–0.75%):', ['Management fee', '12b-1 fee', 'Front-end load', 'Trailer'], 1, 'Management fee: 1%–3%; trailers: 0.25%–1%.', 'Curso'],
    ['Una sociedad de inversión es de renta fija si invierte en títulos de deuda al menos el:', ['50%', '60%', '75%', '80%'], 3, 'Si ninguna categoría supera el 80%, es mixta.', 'Curso'],
    ['El NAV (valor neto por cuota) se calcula como:', ['Activos totales / cuotas', '(Valor de mercado de los activos − obligaciones) / cuotas emitidas', 'Precio de mercado de la cuota', 'Capital pagado / cuotas'], 1, 'Se usa como precio del fondo abierto.', 'Curso'],
    ['Un bono de ingresos (income bond):', ['Siempre paga intereses', 'Paga intereses solo si la empresa tiene ingresos suficientes', 'Está garantizado por hipotecas', 'Es un cupón cero'], 1, 'Se usa cuando una empresa sale de la quiebra.', 'Curso'],
  ],
  usos: [
    ['Mercado donde se negocian fuera de bolsa valores registrados en bolsa:', ['Primer mercado', 'Segundo mercado (OTC)', 'Tercer mercado', 'Cuarto mercado'], 2, 'El cuarto mercado es institucional (INSTINET).', 'Curso'],
    ['Un dealer (principal):', ['Cobra comisión y debe divulgarla', 'Gana un sobreprecio y no debe divulgar su monto', 'No puede tener inventario', 'No puede formar mercado'], 1, 'Debe divulgar su función, pero no el sobreprecio.', 'Curso'],
    ['Requisitos de listado en NYSE:', ['500,000 acciones públicas', '1.1 millones de acciones públicas, 2,000 accionistas con al menos 100 acciones y precio mínimo $3', '10,000 accionistas', 'Capitalización de $1,000 millones'], 1, '1 lote = 100 acciones.', 'Curso'],
    ['Orden que debe ejecutarse completa inmediatamente o cancelarse:', ['GTC', 'AON', 'FOK', 'Stop'], 2, 'AON: todo o nada durante la jornada.', 'Curso'],
    ['Órdenes que se reducen en la fecha ex-dividendo:', ['Las colocadas por encima del mercado', 'Las colocadas por debajo del mercado (compra límite y venta stop)', 'Las órdenes a mercado', 'Ninguna'], 1, 'Porque el precio baja por el monto del dividendo.', 'Curso'],
    ['El riesgo de una venta en corto es:', ['Limitado a la inversión', 'Teóricamente ilimitado', 'Nulo', 'Igual a la prima'], 1, 'El precio puede subir sin límite y hay que reponer las acciones.', 'Curso'],
    ['Cotización "51 1/8 a 1/2". Una orden de compra a mercado se ejecuta a:', ['51.125', '51.50', '51.00', '51.3125'], 1, 'Compras a mercado al offer (51.50); ventas a mercado al bid (51.125).', 'Curso', true],
    ['T-bill 5.10% y Eurodólar 5.50%. El TED spread es:', ['4 pb', '40 pb', '0.4 pb', '10.6%'], 1, '5.50% − 5.10% = 0.40% = 40 pb.', 'Curso', true],
    ['Según la ecuación de Fisher, si el YTM es 6% y la inflación 2%, el rendimiento real es:', ['8%', '4%', '3%', '12%'], 1, 'Real = YTM − inflación.', 'Curso', true],
    ['Índice de la bolsa de París:', ['DAX', 'FTSE 100', 'CAC 40', 'IBEX 35'], 2, 'DAX = Alemania; FTSE 100 = Londres; IBEX 35 = España.', 'Curso'],
    ['Índice de la Bolsa Mexicana de Valores:', ['BOVESPA', 'IPC', 'MERVAL', 'IGBC'], 1, 'Concentra 35 empresas.', 'Curso'],
    ['Autorregulador privado de brokers y dealers en EE.UU.:', ['SEC', 'FINRA', 'CFTC', 'FED'], 1, 'La SEC es el regulador federal.', 'Curso'],
  ],
  curva: [
    ['Una curva de rendimiento invertida generalmente anticipa:', ['Expansión económica', 'Recesión', 'Inflación alta sostenida', 'Estabilidad de tasas'], 1, 'El spread largo−corto es negativo por política monetaria restrictiva.', 'Curso'],
    ['La teoría que sostiene que los inversionistas prefieren instrumentos de corto plazo y exigen prima por plazo es la de:', ['Expectativas', 'Preferencia por liquidez (Hicks)', 'Segmentación', 'Hábitat preferido'], 1, 'Explica la curva normalmente ascendente.', 'Curso'],
    ['La teoría del hábitat preferido fue impulsada por:', ['Hicks', 'Keynes', 'Modigliani y Sutch', 'Markowitz'], 2, 'Los agentes solo abandonan su tramo preferido si se les paga una prima.', 'Curso'],
    ['Una curva nivelada (flat) suele reflejar:', ['Política monetaria expansiva', 'El inicio de una política monetaria restrictiva', 'Deflación', 'Crecimiento acelerado'], 1, 'Las tasas cortas suben más rápido que las largas.', 'Curso'],
    ['Si se espera que las tasas bajen, un gestor de renta fija debería:', ['Acortar duración', 'Alargar duración (bonos largos)', 'Vender todos los bonos', 'Comprar solo letras'], 1, 'Los bonos largos se aprecian más al bajar las tasas.', 'Curso'],
  ],
  forex: [
    ['Un PIP en EUR/USD es un movimiento de:', ['0.01', '0.001', '0.0001', '1.0'], 2, 'Una unidad en el cuarto decimal.', 'Curso'],
    ['Si aumenta la oferta de divisas en un país (sin otros cambios), la moneda nacional:', ['Se deprecia', 'Se aprecia', 'No cambia', 'Se devalúa'], 1, 'El tipo de cambio baja.', 'Curso'],
    ['La teoría de la Paridad del Poder Adquisitivo fue expuesta por:', ['John Keynes', 'Gustav Cassel', 'John Muth', 'Irving Fisher'], 1, 'Se basa en la ley del precio único (ej. índice Big Mac).', 'Curso'],
    ['La teoría de la paridad de tasas de interés se asocia a:', ['Keynes', 'Cassel', 'Muth', 'Markowitz'], 0, 'Relaciona tipos spot y forward con el diferencial de tasas.', 'Curso'],
    ['CAD cuesta USD 0.73 en Nueva York y USD 0.79 en Panamá. Ganancia por arbitraje de dos puntos por CAD:', ['USD 0.06', 'USD 0.73', 'USD 1.52', 'No hay arbitraje'], 0, 'Comprar en NY y vender en Panamá.', 'Curso', true],
    ['¿Cuál es una fuente de DEMANDA de divisas?', ['Exportaciones', 'Remesas recibidas', 'Importaciones', 'Inversión extranjera directa entrante'], 2, 'Las otras son fuentes de oferta.', 'Curso'],
    ['La depreciación de la moneda nacional:', ['Abarata la deuda externa', 'Estimula las exportaciones y el turismo receptivo', 'Estimula los viajes al exterior', 'Reduce la competitividad'], 1, 'Encarece la deuda externa en moneda local.', 'Curso'],
    ['Divisa más antigua del mundo que aún circula:', ['Dólar estadounidense', 'Yen', 'Libra esterlina', 'Franco suizo'], 2, '—', 'Curso'],
  ],
  portafolio: [
    ['Rf = 6%, rendimiento esperado del mercado 15%, beta 0.30. Rentabilidad exigida según CAPM:', ['8.7%', '10.5%', '4.5%', '15%'], 0, '6% + 0.30 × (15% − 6%) = 8.7%.', 'Curso', true],
    ['Portafolio con rendimiento 15%, σ 22% y tasa libre de riesgo 7%. Ratio de Sharpe:', ['0.36', '0.68', '0.32', '1.57'], 0, '(15% − 7%) / 22% = 0.36.', 'Curso', true],
    ['Escenarios: boom 25% prob. (25%), estable 50% (15%), recesión 25% (5%). Retorno esperado:', ['15%', '12.5%', '20%', '17.5%'], 0, '6.25% + 7.5% + 1.25% = 15%.', 'Curso', true],
    ['Una acción con beta 2.0:', ['Tiene la mitad del riesgo del mercado', 'Tiene el doble de volatilidad que el mercado', 'No tiene riesgo', 'Se mueve inversamente al mercado'], 1, 'El mercado tiene beta 1.', 'Curso'],
    ['La Teoría Moderna del Portafolio fue expuesta en 1952 por:', ['William Sharpe', 'Harry Markowitz', 'Eugene Fama', 'John Hicks'], 1, 'Demostró el beneficio de la diversificación.', 'Curso'],
    ['Ante dos alternativas con igual retorno esperado, un inversionista averso al riesgo elige:', ['La de mayor riesgo', 'La de menor riesgo', 'Cualquiera', 'Ninguna'], 1, 'La mayoría de inversionistas son aversos al riesgo (perfil conservador).', 'Curso'],
    ['El riesgo de un portafolio NO es el promedio ponderado de las desviaciones individuales debido a:', ['Los costos de transacción', 'La covarianza entre los títulos', 'La inflación', 'El beta'], 1, 'En el ejemplo del curso: 10.40% real vs 10.44% ponderado.', 'Curso'],
    ['La gestión pasiva de un portafolio consiste en:', ['Elegir acciones según la convicción del gestor', 'Replicar un índice de referencia', 'Operar diariamente', 'Invertir solo en derivados'], 1, 'Es más barata que la activa.', 'Curso'],
  ],
  opciones: [
    ['Una opción put está in the money cuando:', ['Spot > Strike', 'Spot < Strike', 'Spot = Strike', 'Nunca'], 1, 'Para el call es al revés.', 'Curso'],
    ['Compra de call de Apple con strike $100 y prima $5. Punto de equilibrio:', ['$95', '$100', '$105', '$110'], 2, 'Strike + prima.', 'Curso', true],
    ['Pérdida máxima del vendedor de un call descubierto (naked call):', ['La prima', 'El strike', 'Ilimitada', 'Cero'], 2, 'El subyacente puede subir sin límite.', 'Curso'],
    ['Diferencia entre warrants y opciones:', ['Los warrants se negocian en bolsa estandarizados', 'Los warrants los emite una empresa y pueden durar años', 'Las opciones duran años', 'No hay diferencias'], 1, 'Las opciones se negocian en bolsa y suelen vencer en meses.', 'Curso'],
    ['La griega que mide la sensibilidad del precio de la opción al paso del tiempo es:', ['Delta', 'Gamma', 'Theta', 'Vega'], 2, 'Vega: volatilidad; Rho: tasa de interés; Delta: subyacente; Gamma: cambio de delta.', 'Curso'],
    ['En un forward, la posición larga gana cuando al vencimiento:', ['El precio spot es menor al pactado', 'El precio spot es mayor al pactado', 'Siempre gana', 'Nunca gana'], 1, 'Rentabilidad larga = St − F0.', 'Curso'],
    ['El primer mercado formal de futuros fue:', ['CBOT (1848)', 'Cho-Ai-Mai en Japón (1730)', 'CME (1919)', 'CBOE (1973)'], 1, 'Se negociaba arroz.', 'Curso'],
    ['En un mercado organizado de derivados, el riesgo de contraparte lo asume:', ['El comprador', 'El vendedor', 'La cámara de compensación', 'El regulador'], 2, 'En OTC lo asumen las partes.', 'Curso'],
    ['Un Credit Default Swap (CDS):', ['Exige ser tenedor del bono', 'Es un seguro contra el incumplimiento; puede usarse para especular', 'Es un futuro sobre acciones', 'Solo lo emiten gobiernos'], 1, 'El comprador paga una cuota periódica al vendedor.', 'Curso'],
    ['Organización que estandariza los contratos de derivados OTC:', ['IOSCO', 'ISDA', 'FINRA', 'BIS'], 1, 'International Swaps and Derivatives Association.', 'Curso'],
    ['Con apalancamiento 10:1, si el activo sube 4%, la rentabilidad del inversionista es aproximadamente:', ['4%', '14%', '40%', '0.4%'], 2, 'Ejemplo del curso.', 'Curso', true],
    ['El arbitraje se caracteriza por:', ['Requerir mucho capital', 'Sin inversión propia, beneficio neto positivo y sin pérdidas', 'Alto riesgo', 'Largo plazo'], 1, 'Formas de participar: especulación, cobertura y arbitraje.', 'Curso'],
  ],
  niif: [
    ['Las NIIF son emitidas por:', ['FASB', 'IASB', 'SEC', 'IOSCO'], 1, 'Incluyen NIIF, NIC e interpretaciones CINIIF.', 'Curso'],
    ['La NIIF 9 empezó a regir a partir de:', ['1 de enero de 2015', '1 de enero de 2018', '1 de enero de 2020', '1 de enero de 2005'], 1, 'Reconocimiento y medición, deterioro y coberturas.', 'Curso'],
    ['Valor razonable medido con precios cotizados en mercados activos corresponde al:', ['Nivel 1', 'Nivel 2', 'Nivel 3', 'Costo amortizado'], 0, 'Nivel 2: variables observables; Nivel 3: no observables.', 'Curso'],
    ['¿Qué norma regula la información a revelar sobre instrumentos financieros?', ['NIC 36', 'NIIF 7', 'NIIF 16', 'NIC 1'], 1, 'NIC 36: deterioro del valor de los activos.', 'Curso'],
    ['¿Cuál activo NO pasaría el test SPPI (solo pagos de principal e intereses)?', ['Nota del Tesoro a 7 años con cupón 3%', 'Préstamo con tasa variable referida a una tasa de mercado', 'Opciones call sobre acciones', 'Papel comercial a descuento'], 2, 'Derivados y acciones no representan solo principal e intereses.', 'Curso'],
    ['Ecuación contable básica:', ['Activos = Pasivos − Patrimonio', 'Activos = Pasivos + Patrimonio', 'Patrimonio = Activos + Pasivos', 'Pasivos = Activos + Patrimonio'], 1, '—', 'Curso'],
    ['Ventas 653.7, costo de ventas 459.6. Margen bruto:', ['29.7%', '11.4%', '70.3%', '19.4%'], 0, '(653.7 − 459.6) / 653.7 = 29.7%.', 'Curso', true],
    ['Activo circulante 202.3, inventarios 95.4, pasivo circulante 49.2. Prueba ácida:', ['4.1 veces', '2.2 veces', '1.9 veces', '6.1 veces'], 1, '(202.3 − 95.4) / 49.2 = 2.2.', 'Curso', true],
    ['Utilidad neta 74.3 y patrimonio 186.7. ROE:', ['20.3%', '39.8%', '11.4%', '49.5%'], 1, '74.3 / 186.7 = 39.8%.', 'Curso', true],
    ['Pasivos totales 179.8 y patrimonio 186.7. Apalancamiento financiero:', ['0.49', '0.96', '1.04', '2.04'], 1, 'Pasivo / Patrimonio = 0.96. Razón de endeudamiento (Pasivo/Activo) = 0.49.', 'Curso', true],
    ['El estado financiero que muestra la situación en un momento determinado es:', ['Estado de resultados', 'Balance general', 'Flujo de efectivo', 'Cambios en el patrimonio'], 1, 'El estado de resultados es dinámico (abarca un período).', 'Curso'],
  ],
  corporativas: [
    ['Un proyecto con VAN positivo:', ['Debe rechazarse', 'Crea valor y debe aceptarse', 'Tiene TIR menor al costo de capital', 'Tiene VAN igual a la TIR'], 1, 'VAN > 0 ⇔ TIR > costo de capital (en proyectos convencionales).', 'General'],
    ['¿Cuánto vale hoy $1,000 a recibir en 2 años con tasa 10%?', ['$826.45', '$909.09', '$1,210.00', '$800.00'], 0, '1,000 / 1.1² = 826.45.', 'General', true],
    ['$1,000 invertidos al 5% anual durante 3 años valen:', ['$1,150.00', '$1,157.63', '$1,050.00', '$1,500.00'], 1, '1,000 × 1.05³ = 1,157.63.', 'General', true],
    ['El WACC representa:', ['El costo de la deuda', 'El costo promedio ponderado de la deuda y el capital', 'La TIR del proyecto', 'El rendimiento del dividendo'], 1, 'Retorno exigido por accionistas y acreedores ponderado.', 'Curso'],
    ['Al aumentar la proporción de deuda en la estructura financiera:', ['Disminuye el riesgo financiero', 'Aumenta el apalancamiento y el riesgo financiero', 'No cambia el riesgo', 'Disminuye el ROE siempre'], 1, 'La deuda amplifica el ROE en ambos sentidos.', 'General'],
  ],
  nacional: [
    ['Desde 1904, la moneda de curso legal que circula en Panamá junto al Balboa es:', ['El euro', 'El dólar de EE.UU.', 'El peso colombiano', 'Solo el Balboa'], 1, 'El Balboa está a la par con el dólar y solo circula en monedas.', 'General'],
    ['Una consecuencia de la dolarización de Panamá es:', ['Tener un banco central emisor', 'No contar con política monetaria propia', 'Tipo de cambio flotante', 'Alta inflación estructural'], 1, 'La política económica se apoya en la fiscal y en la regulación prudencial.', 'General'],
    ['El sector que más aporta al PIB de Panamá es:', ['Agricultura', 'Minería', 'Servicios (logística, comercio, banca)', 'Manufactura'], 2, 'Canal, puertos, Zona Libre de Colón, centro bancario.', 'General'],
    ['¿Qué entidad produce las estadísticas oficiales (PIB, inflación) de Panamá?', ['SMV', 'INEC (Contraloría General)', 'Banco Nacional', 'Superintendencia de Bancos'], 1, 'Fuente sugerida en el temario.', 'Temario'],
  ],
  internacional: [
    ['Organismo multilateral encargado de la estabilidad del sistema monetario internacional:', ['Banco Mundial', 'FMI', 'OMC', 'OCDE'], 1, 'También elige las divisas que componen los DEG.', 'General'],
    ['Organismo que establece las reglas del comercio internacional:', ['FMI', 'OMC', 'BID', 'ONU'], 1, '—', 'General'],
    ['Organismo que emite estándares contra el lavado de dinero y el financiamiento del terrorismo:', ['IOSCO', 'GAFI (FATF)', 'Basilea', 'SEC'], 1, 'Sus recomendaciones inspiran la Ley 23 de 2015.', 'General'],
    ['La crisis financiera de 2008 se originó principalmente en:', ['El mercado de divisas asiático', 'Hipotecas subprime y sus derivados en EE.UU.', 'La deuda soberana griega', 'El precio del petróleo'], 1, 'Quiebra de Lehman Brothers; papel de los CDS y MBS.', 'General'],
  ],
};

// Las respuestas se redactaron casi siempre en la opción B; se reordenan las opciones de forma
// determinista (misma semilla por id) para que la letra correcta no sea predecible. No se mezclan
// las opciones que dependen de su posición ("todas las anteriores", combinaciones I, II…).
const POSITIONAL = /anteriores|^[a-e] y [a-e]|^(I|II|III|IV)[,\s]/i;

function seeded(id) {
  let h = 2166136261;
  for (const ch of id) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

function reorder(id, o, a) {
  if (o.some((x) => POSITIONAL.test(x))) return { o, a };
  const rand = seeded(id);
  const idx = o.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return { o: idx.map((i) => o[i]), a: idx.indexOf(a) };
}

export const BANK = Object.entries(RAW).flatMap(([topic, items]) =>
  items.map(([q, o, a, e, src, calc], i) => {
    const id = `B-${topic}-${i + 1}`;
    return { id, topic, q, ...reorder(id, o, a), e, src, calc: !!calc };
  }),
);
