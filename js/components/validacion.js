export function validationSearch() {
    const $form = document.getElementById("form__search"),
          $search = document.querySelector(".search"),
          $span = document.createElement("span");

        $span.id = "span-error",
        $span.classList.add("span-error", "hidden"),
        $span.textContent = $search.title;

    $form.insertAdjacentElement("afterend", $span);

    document.addEventListener("keyup", (e) => {
       
        if (e.target.matches(".search")) {
            let pattern = $search.pattern;

            if ($search.value !== "") {
                let regex = new RegExp(pattern);

                return !regex.exec($search.value) ?
                    document.getElementById("span-error").classList.add("is-active") :
                    document.getElementById("span-error").classList.remove("is-active");
            }
        }
    });
}