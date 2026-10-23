# Bridge UTM para el quiz embebido

El iframe no puede leer los parámetros UTM de la página padre por la política de seguridad del navegador. Agrega este bloque en la sección o snippet de Shopify donde se carga el iframe del quiz.

```html
<script>
  window.addEventListener("message", function (event) {
    const allowedQuizOrigins = [
      "https://frontend.test.hugoorielso.com"
    ];

    if (!allowedQuizOrigins.includes(event.origin)) return;
    if (event.data?.type !== "RICCIA_REQUEST_CAMPAIGN") return;

    event.source.postMessage(
      {
        type: "RICCIA_CAMPAIGN_CONTEXT",
        url: window.location.href
      },
      event.origin
    );
  });
</script>
```

Si cambia el dominio del frontend, reemplaza `https://frontend.test.hugoorielso.com` por el origen exacto que aparece en el atributo `src` del iframe, sin rutas finales.
