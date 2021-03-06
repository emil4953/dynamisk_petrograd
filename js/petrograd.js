window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("siden vises");

    //læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktliste);

}

function visProduktliste(listen) {
    console.table(listen);

    listen.forEach(visProdukt);
}

function visProdukt(produkt) {
    console.log(produkt);
    // klon produkt_template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);

    // indsæt data i klon
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));

    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    klon.querySelector(".data_billede").src = "/billeder/small/" + produkt.billede + "-sm.jpg";

    if (produkt.udsolgt == false) {
        //produktete re ikke udsolgt
        // udsolgttekst skal fjernes

        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild(udsolgttekst);
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    if (produkt.udsolgt == true || produkt.rabatsats == 0) {
        //der er ikke rabat, rabat-prisen skal fjernes

        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {

        klon.querySelector(".pris").classList.add("rabat");
    }

    // append klon til .produkt_liste
    //document.querySelector(".produktliste").appendChild(klon);
    console.log("." + produkt.kategori)

    document.querySelector("." + produkt.kategori).appendChild(klon);

    /*

        if (produkt.kategori == 'forretter') {
         document.querySelector(".forretter").appendChild(klon);
        }

        else if (produkt.kategori == ".hovedretter") {
         document.querySelector(".hovedretter").appendChild(klon);
        }
    */

}
