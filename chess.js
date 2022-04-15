
function addElement () {
    let tablerr = document.createElement("table")

    document.body.appendChild(tablerr);

    for(i = 1; i < 9 ; i++){
        const table_row = document.createElement("tr");
        tablerr.appendChild(table_row)
        for(n = 1; n < 9 ; n++){
            const table_colum = document.createElement("td");
            table_row.appendChild(table_colum)
        }
    }

}
    addElement()

