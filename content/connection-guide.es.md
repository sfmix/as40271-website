---
title: "Guía de conexión"
description: "Cómo los ISP de acceso (eyeball) se adhieren a AS40271, qué esperar y las advertencias sinceras."
---

{{< callout type="warn" title="Lee esto primero" >}}
**AS40271 no es un reemplazo del tránsito.** Transporta tráfico almacenable en caché desde una lista reducida de fuentes de contenido — eso es todo. Tu red sigue necesitando tránsito completo (o una huella real de peering BGP) para alcanzar el resto de Internet.

**No hay SLA.** Las cachés se caen por actualizaciones. Depender exclusivamente del contenido de AS40271 perjudicará a tus usuarios el primer día de una interrupción. Trátalo como una descarga (offload), no como un salvavidas.
{{< /callout >}}

AS40271 es de adhesión voluntaria para los ISP de acceso (eyeball) del Área de la Bahía. Aquí tienes quién encaja, qué esperar de la relación y las advertencias sinceras antes de que levantes una sesión BGP.

## Elegibilidad

Estamos hechos para **redes de acceso (eyeball) locales**: ISP residenciales, comunitarios, municipales y de pequeñas empresas cuyos usuarios están en el Área de la Bahía de San Francisco. Si la mayor parte de tu tráfico va destinado a usuarios finales en dispositivos de consumo, eres de los nuestros.

Necesitarás **un puerto en uno de nuestros sitios de borde** (consulta las [ubicaciones en sfmix.org](https://sfmix.org/locations/)) y tu propio **ASN público con al menos un prefijo en el IRR**. Haremos BGP contigo sobre IPv4 e IPv6.

Las redes de contenido, los proveedores de tránsito y las propias CDN deberían hacer peering con SFMIX directamente ([sfmix.org](https://sfmix.org)) — AS40271 es la puerta equivocada para ustedes.

## Qué esperar

Intercambiaremos una sola sesión eBGP por familia de direcciones. AS40271 anuncia los prefijos cubiertos por nuestros participantes de caché y peering de contenido. Tú anuncias de vuelta los prefijos de tus clientes para que las cachés sepan dónde entregar los bytes. Consulta la [referencia de comunidades BGP](/bgp-communities/) para conocer las etiquetas informativas y las comunidades de acción que puedes usar.

Espera que **decenas por ciento** de tus bytes de bajada lleguen a AS40271 una vez que esté activo — las cifras exactas dependen de la combinación de tus suscriptores. Los días de parches de Steam, los lanzamientos de OS de Apple, los despliegues de Windows Update y los grandes eventos de YouTube provocarán picos. Dimensiona tu capacidad en consecuencia.

Obtendrás la lista de correo `tech-c@sfmix.org`, un número de teléfono con personas de verdad y un lugar en nuestras conversaciones de planificación sobre qué fuentes de contenido perseguir a continuación.

## Advertencias (la aburrida letra pequeña)

- **Sin SLA.** Mejor esfuerzo. Sin créditos, sin árbol de escalamiento.
- **No es tránsito.** No apuntes una ruta por defecto hacia nosotros. Filtraremos tus rutas por defecto; te llevarás un disgusto.
- **No dependas exclusivamente de nosotros.** Cuando la caché esté caída, tus usuarios querrán bytes desde algún sitio. Ten un upstream de verdad.
- **El contenido de la caché varía.** Lo que hay en AS40271 hoy podría no estar en AS40271 el próximo trimestre. Las alianzas de contenido cambian.
- **Los prefijos deben estar en el IRR.** Sin registro IRR, no hay anuncio. No registraremos por proxy en tu nombre.
- **Se recomiendan encarecidamente los ROA de RPKI.** Descartaremos los inválidos.

## ¿Listo?

Escribe a [tech-c@sfmix.org](mailto:tech-c@sfmix.org) con tu ASN, el PoP en el que te gustaría conectarte y una descripción de una línea de tu red. Te enviaremos de vuelta un cuestionario de peering y levantaremos una sesión.
