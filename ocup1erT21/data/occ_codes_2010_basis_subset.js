var occ_codes = {
"1211":"Directores y gerentes en administración, recursos humanos y mercadotecnia",
"1314":"Directores y gerentes en producción manufacturera",
"1315":"Directores y gerentes en construcción, reparación y mantenimiento",
"1411":"Directores y gerentes de ventas, comercialización y alquiler",
"1412":"Directores y gerentes de restaurantes y hoteles",
"1511":"Coordinadores y jefes de área en administración, recursos humanos y mercadotecnia",
"1524":"Coordinadores y jefes de área en servicios legales, jueces calificadores y fiscales",
"2111":"Administradores y especialistas en recursos humanos y sistemas de gestión",
"2112":"Especialistas y consultores en mercadotecnia, publicidad, comunicación y comercio exterior",
"2121":"Contadores y auditores",
"2135":"Abogados",
"2142":"Psicólogos ",
"2162":"Dibujantes y diseñadores artísticos, ilustradores y grabadores",
"2172":"Músicos",
"2321":"Profesores universitarios y de enseñanza superior",
"2322":"Profesores de preparatoria y equivalentes",
"2331":"Profesores de enseñanza secundaria",
"2332":"Profesores de enseñanza primaria",
"2335":"Profesores de enseñanza preescolar",
"2411":"Médicos generales y familiares",
"2413":"Dentistas",
"2426":"Enfermeras especialistas",
"2511":"Auxiliares en administración, mercadotecnia, comercialización y comercio exterior",
"2512":"Auxiliares en contabilidad, economía, finanzas y agentes de bolsa",
"2543":"Diseñadores gráficos",
"2614":"Auxiliares y técnicos en veterinaria, pesca y forestación",
"2632":"Mecánicos en mantenimiento y reparación de vehículos de motor",
"2633":"Técnicos en mantenimiento y reparación de maquinaria e instrumentos industriales",
"2634":"Mecánicos en mantenimiento y reparación de maquinaria e instrumentos industriales",
"2642":"Electricistas y linieros",
"2643":"Técnicos en instalación y reparación de equipos electrónicos, telecomunicaciones y electrodoméstico (excepto equipos informáticos)",
"2644":"Trabajadores en instalación y reparación de equipos electrónicos, telecomunicaciones y electrodoméstico (excepto equipos informáticos)",
"2651":"Técnicos en la instalación y reparación de redes, equipos y en sistemas computacionales",
"2716":"Profesores en educación física y deporte",
"2821":"Auxiliares en enfermería y paramédicos",
"3101":"Supervisores de secretarias, capturistas, cajeros y trabajadores de control de archivo y transporte",
"3111":"Secretarias ",
"3115":"Trabajadores de apoyo en actividades administrativas diversas",
"3121":"Cajeros, taquilleros y receptores de apuestas",
"3132":"Encargados y trabajadores en control de almacén y bodega",
"3211":"Recepcionistas y trabajadores que brindan información (de forma personal)",
"3212":"Trabajadores que brindan información por teléfono (centro de llamadas) y anunciadores ",
"4111":"Comerciantes en establecimientos",
"4201":"Encargados y supervisores de ventas de productos y de servicios financieros y de alquiler",
"4211":"Empleados de ventas, despachadores y dependientes en comercios",
"4214":"Choferes vendedores",
"4221":"Agentes y representantes de ventas y consignatarios",
"4222":"Agentes de seguros y servicios financieros (ejecutivos de cuenta)",
"4223":"Agentes de bienes raíces ",
"4224":"Vendedores por catálogo",
"4231":"Demostradores y promotores",
"5101":"Supervisores en la preparación y servicio de alimentos y bebidas, así como en servicios de esparcimiento y de hotelería",
"5111":"Cocineros",
"5112":"Fonderos, vendedores y comerciantes de comida",
"5114":"Taqueros y preparadores de comida rápida, antojitos, pizzas, hot dogs, jugos, café, etcétera",
"5115":"Cantineros",
"5116":"Meseros ",
"5211":"Peluqueros, barberos, estilistas y peinadores",
"5212":"Maquillistas, manicuristas, pedicuristas y tatuadores",
"5222":"Cuidadores de niños, personas con discapacidad y ancianos en casas particulares",
"5241":"Jardineros en establecimientos",
"5242":"Jardineros en casas particulares",
"5312":"Policías y agentes de tránsito ",
"5313":"Vigilantes y guardias en establecimientos",
"6111":"Trabajadores en el cultivo de maíz y/o frijol",
"6112":"Trabajadores en el cultivo de hortalizas y verduras",
"6114":"Trabajadores en el cultivo de frutales",
"6116":"Trabajadores en otros cultivos agrícolas",
"6121":"Trabajadores en la cría de ganado bovino",
"6123":"Trabajadores en la cría avícola",
"6131":"Trabajadores que combinan actividades agrícolas con ganaderas",
"6223":"Trabajadores en viveros e invernaderos",
"7101":"Supervisores de trabajadores en la extracción, albañiles y en acabados de la construcción",
"7121":"Albañiles, mamposteros y afines  ",
"7132":"Instaladores de pisos, azulejos, mosaicos y baldosas",
"7133":"Instaladores de material aislante, de impermeabilización, vidrio y otros materiales",
"7134":"Plomeros, fontaneros e instaladores de tubería ",
"7135":"Pintores de brocha gorda ",
"7211":"Moldeadores, torneros y troqueladores",
"7212":"Soldadores y oxicortadores",
"7213":"Hojalateros, chaperos, latoneros, cobreros y pintores de metales",
"7221":"Herreros, balconeros, aluminadores y forjadores",
"7311":"Carpinteros, ebanistas y cepilladores en la elaboración de productos de madera",
"7341":"Sastres y modistos, costureras y confeccionadores de prendas de vestir",
"7352":"Peleteros, cortadores, curtidores y teñidores de cuero, piel y similares ",
"7411":"Trabajadores en la elaboración y reparación de productos de hule, caucho, plásticos y vulcanización de neumáticos ",
"7511":"Trabajadores en la elaboración de productos de carne, pescado y sus derivados ",
"7513":"Trabajadores en la elaboración de pan, tortilla, repostería, y otros productos de cereales y harinas ",
"7515":"Trabajadores en la elaboración de productos a base de azúcar, chocolate, confitería y tabaco ",
"7517":"Trabajadores en la elaboración de bebidas alcohólicas y no alcohólicas ",
"7611":"Alfareros y trabajadores ceramistas ",
"7612":"Trabajadores en la elaboración de productos de cemento, cal, yeso, azulejo, piedra y ladrilleros ",
"7613":"Trabajadores del vidrio y similares ",
"8101":"Supervisores de operadores de maquinaria industrial",
"8123":"Operadores de máquinas que cortan, perforan, doblan, troquelan, sueldan, etc., piezas y productos metálicos",
"8132":"Operadores de máquinas para la elaboración de productos farmacéuticos y cosméticos",
"8133":"Operadores de máquinas para la elaboración y ensamble de productos de plástico y hule",
"8142":"Operadores de máquinas para la elaboración de productos de madera, bejuco, mimbre  y similares",
"8153":"Operadores de máquinas de costura, bordado y de corte para la confección de productos textiles y prendas de vestir",
"8161":"Operadores de máquinas en la elaboración de alimentos, aceites, grasas, sal y especias",
"8201":"Supervisores en procesos de ensamblado y montaje de  maquinaria, herramientas y productos metálicos y electrónicos",
"8211":"Ensambladores y montadores de herramientas, maquinaria, equipos y productos metálicos",
"8212":"Ensambladores y montadores de partes eléctricas y electrónicas",
"8341":"Conductores de camiones, camionetas y automóviles de carga ",
"8342":"Conductores de autobuses, camiones, camionetas, taxis y automóviles de pasajeros ",
"8344":"Conductores de motocicleta",
"8351":"Conductores de maquinaria móvil para la construcción y minería",
"8352":"Conductores de maquinaria móvil para el movimiento de mercancías en fábricas, puertos, comercios, etcétera",
"9111":"Trabajadores de apoyo en actividades agrícolas",
"9112":"Trabajadores de apoyo en actividades ganaderas",
"9221":"Trabajadores de apoyo en la construcción",
"9231":"Trabajadores de apoyo en la elaboración, reparación y mantenimiento mecánico de equipos, maquinaria y productos de metal y de precisión ",
"9233":"Trabajadores de apoyo en la industria química, petroquímica y plásticos",
"9234":"Trabajadores de apoyo en la industria de la madera, papel y cartón",
"9236":"Trabajadores de apoyo en la industria de alimentos, bebidas y productos de tabaco",
"9331":"Cargadores",
"9411":"Ayudantes en la preparación de alimentos",
"9512":"Vendedores ambulantes de artículos diversos (excluyendo los de venta de alimentos)",
"9521":"Preparadores y vendedores ambulantes de alimentos",
"9601":"Supervisores en limpieza, amas de llaves, mayordomos y en estacionamientos",
"9611":"Trabajadores domésticos ",
"9621":"Barrenderos y trabajadores de limpieza  (excepto en hoteles y restaurantes)",
"9631":"Lavadores de vehículos en establecimientos",
"9632":"Lavadores de vehículos en vía pública",
"9661":"Recolectores de basura y material reciclable",
"9662":"Clasificadores de desechos",
}
