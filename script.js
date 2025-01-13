const goal = 500;

let total, ran_animation = false;

window.onscroll = () => {
    document.body.style.setProperty("--scroll", scrollY / innerHeight);
    if(scrollY / innerHeight >= .5 && !ran_animation && total) {
        const total_element = document.querySelector("#total");

        ran_animation = true;
        let part = 0;

        let i = 0;
        function frame() {
            total_element.dataset.content = "$" + Math.round((part += total / 200) * 100) / 100;
            total_element.style.setProperty("--progress", Math.min(1, part / goal));
            if(++i < 200) setTimeout(frame, 100 ** (i / 200));
        }
        frame();
    }
}

fetch("https://hcb.hackclub.com/chsane/donations").then(res => res.text()).then(html => {
    total = +html.match(/stat__value">(.+?)</)[1];
});