
const form = document.querySelector("form");
const catSelector = document.querySelector("#categorySelect");





window.addEventListener('load', (event) => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    let foundValue = params.category; // "some_value"
    const selectedOption = document.querySelector(`#${foundValue}`)
    selectedOption.selected = "selected";
    console.log(selectedOption);
})


catSelector.addEventListener('change', (event) => {
    form.action = `/products?category=${event.target.value}`
    // const selectedOption = document.querySelector("option[value:event.target.value]")
    document.querySelector("form").submit()
    // selectedOption.selected = "selected";
});
console.log("Running Script!")
