(function(){
  function maybeRemoveMe(elt) {
    const attr = elt.getAttribute('remove-me') || elt.getAttribute('data-remove-me');
    if (attr) {
      const opts = attr.split(' ')
      const type = opts.length === 2 ? opts[0] : null
      const timing = opts.length === 2 ? opts[1] : opts[0]

      const duration = htmx.parseInterval(timing);

      setTimeout(function () {
        animation(elt, type);
      }, duration - 600);
  
      setTimeout(function () {
        elt.parentElement.removeChild(elt);
      }, duration);
    }
  }

  htmx.defineExtension('remove-me', {
      onEvent: function (name, evt) {
          if (name === "htmx:afterProcessNode") {
              var elt = evt.detail.elt;
              if (elt.getAttribute) {
                  maybeRemoveMe(elt);
                  if (elt.querySelectorAll) {
                      var children = elt.querySelectorAll("[remove-me], [data-remove-me]");
                      for (var i = 0; i < children.length; i++) {
                          maybeRemoveMe(children[i]);
                      }
                  }
              }
          }
      }
  });
})();

function animation(elt, type) {
  elt.style.opacity = 0;
  switch (type) {
    case "slide":
      elt.style.transition = 'all 600ms ease';
      elt.style.transform = 'translateX(150px)';
      break;
    case "fade":
      elt.style.transition = 'all 600ms ease';
      break;
    case "fall":
      elt.style.transition = 'all 600ms ease';
      elt.style.transform = 'translateY(50px)';
      break;
    case "up":
      elt.style.transition = 'all 600ms ease';
      elt.style.transform = 'translateY(-50px)';
      break;
    default:
      elt.style.transition = 'all 600ms ease';
    break;
  }
}