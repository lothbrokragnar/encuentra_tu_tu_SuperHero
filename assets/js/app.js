// Enables Bootstrap Tooltips 
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

$(document).ready(function () {
    // method used to launch the search through the API
    $("#form").submit(function (e) {
        
        e.preventDefault();
        const sp_number = $("#sp_number");
        const idSH = sp_number.val() //value used to determine what character will be displayed
        let stringValidation = /[a-zA-Z]/gim;
        if (idSH == stringValidation || idSH > 731 || idSH < 1) { 
            alert(`El numero ingresado (${idSH}) no está dentro del rango especificado, intentelo de nuevo.`)
        } else { //
            $.ajax({
                type: "GET",
                dataType: "json",
                url: `https://superheroapi.com/api.php/10225865940492837/${idSH}`, //this url will be used to retrieve an array

                success: function (datos) {

                    // POWERSTATS
                    let {
                        'intelligence': int
                    } = datos.powerstats;
                    let {
                        'strength': str
                    } = datos.powerstats;
                    let {
                        'speed': spd
                    } = datos.powerstats;
                    let {
                        'durability': drb
                    } = datos.powerstats;
                    let {
                        'power': pwr
                    } = datos.powerstats;
                    let {
                        'combat': cmb
                    } = datos.powerstats;

                    $("#summary").html(`
                        <div class='card-group'>
                            <div class='card mb-3'>
                                <div  class='row g-0'>
                                    <div class='col-md-4'>
                                        <img id='superPicture' src='${datos.image.url}' class='img-fluid rounded-start' alt='...'></img>
                                    </div>
                                    <div class='col-md-8'>
                                        <ul class='list-group list-group-flush'>
                                            <li id='superHero' class='list-group-item'>
                                                <h5>${datos.name}</h5>
                                                <p><strong>Conexiones</strong>: ${datos.connections["group-affiliation"]}, ${datos.connections.relatives}</p>
                                            </li>
                                            <li id='super' class='list-group-item'><p><strong>Publicado por</strong>: ${datos.biography.publisher}</p></li>
                                            <li id='super' class='list-group-item'><p><strong>Ocupación</strong>: ${datos.work.occupation}</p></li>
                                            <li id='super' class='list-group-item'><p><strong>Primera aparición</strong>: ${datos.biography["first-appearance"]}</p></li>
                                            <li id='super' class='list-group-item'><p><strong>Altura</strong>: ${datos.appearance.height}</p><p><strong>Peso</strong>: ${datos.appearance.weight}</p></li>
                                            <li id='super' class='list-group-item'><strong>A.K.A.</strong>: ${datos.biography.aliases}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                                <div class="card">
                                    <div class="card-body">
                                        <div id="chartContainer" style="height: 370px; width: 100%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);

                    let options = {
                        title: {
                            text: `Estadisticas de poder para ${datos.name}`
                        },
                        animationEnabled: true,
                        data: [{
                            type: "pie",
                            startAngle: 40,
                            toolTipContent: "<b>{label}</b>: {y}",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}",
                            dataPoints: [{
                                    y: int,
                                    label: "Intelligence"
                                },
                                {
                                    y: str,
                                    label: "Strength"
                                },
                                {
                                    y: spd,
                                    label: "Speed"
                                },
                                {
                                    y: drb,
                                    label: "Durability"
                                },
                                {
                                    y: pwr,
                                    label: "Power"
                                },
                                {
                                    y: cmb,
                                    label: "Combat"
                                },
                            ]
                        }]
                    };
                    $("#chartContainer").CanvasJSChart(options);
                },
                error: function (error) {
                    console.log(error);
                },
            });
        };
    });
});