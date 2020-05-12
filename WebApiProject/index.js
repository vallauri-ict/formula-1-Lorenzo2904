"use strict";

$(() => {
    $("#caricaDrivers").on("click", () => {
        $("#wrapper").empty();
        $("#info").empty();
        richiesta("/drivers/list", data => {
            creaTabellaDrivers(data);
        });
    });

    $("#caricaTeams").on("click", () => {
        $("#wrapper").empty();
        $("#info").empty();
        richiesta("/teams/list", data => {
            creaTabellaTeams(data);
        });
    });

    $("#caricaCircuits").on("click", () => {
        $("#wrapper").empty();
        $("#info").empty();
        richiesta("/circuits/list", data => {
            creaTabellaCircuits(data);
        });
    });
});

function creaTabellaDrivers(drivers)
{
    let _table = $("<table>");
    for (let i = 0; i < drivers.length; i++) {
        let row = $("<tr>");
        for (let index in drivers[i]) {
            let cell = $("<td>");
            if (index != "img") {
                cell.text(drivers[i][index]);
                row.append(cell);
            }
            else {
                let _img = $("<img>");
                _img.prop("src", drivers[i][index]);
                _img.prop("height", "50");
                row.append(_img);
            }
        }
        let btnInfo = $(`<input type='button' onclick='visualizzaDriver(${drivers[i]["id"]})' value='Info'>`);
        row.append(btnInfo);
        _table.append(row);
    }
    $("#wrapper").append(_table);
}

function visualizzaDriver(id) {
    let info = $("#info");
    info.empty();
    richiesta(`/drivers/${id}`, data => {
        console.log(data);
        let nome = data["firstname"];
        let cognome = data["lastname"];
        let foto = data["img"];
        let dob = data["dob"];
        let pob = data["placeOfBirthday"];
        let desc = data["description"];
        let naz = data["country"]["countryName"];
        info.append($(`<h1>${nome} ${cognome}</h1>`));
        let p = $(`<p>Date of Birth: ${dob.split("T")[0]}</p>`);
        info.append(p);
        p = $(`<p>Place of Birth: ${pob}</p>`);
        info.append(p);
        p = $(`<p>Nationality: ${naz}</p>`);
        info.append(p);
        let img = $("<img>");
        img.prop("src", foto);
        img.prop("height", "150");;
        info.append(img);
        p = $(`<p>Description: ${desc}</p>`);
        info.append(p);
    });
}

function creaTabellaTeams(teams) {
    let _table = $("<table>");
    for (let i = 0; i < teams.length; i++) {
        let row = $("<tr>");
        for (let index in teams[i]) {
            let cell = $("<td>");
            if (index != "img" && index != "logo") {
                cell.text(teams[i][index]);
                row.append(cell);
            }
            else {
                let _img = $("<img>");
                _img.prop("src", teams[i][index]);
                _img.prop("height", "50");
                row.append(_img);
            }
        }
        let btnInfo = $(`<input type='button' onclick='visualizzaTeam(${teams[i]["id"]})' value='Info'>`);
        row.append(btnInfo);
        _table.append(row);
    }
    $("#wrapper").append(_table);
}

function visualizzaTeam(id) {
    let info = $("#info");
    info.empty();
    richiesta(`/teams/${id}`, data => {
        console.log(data);
        let chassis = data["chassis"];
        let paese = data["country"]["countryName"];
        let primoDriver = data["firstDriver"]["firstname"] + " " + data["firstDriver"]["lastname"];
        let nomeCompleto = data["fullTeamName"];
        let foto = data["img"];
        let logo = data["logo"];
        let nome = data["name"];
        let pU = data["powerUnit"];
        let techChief = data["technicalChief"];
        let secondDriver = data["secondDriver"]["firstname"] + " " + data["secondDriver"]["lastname"];

        info.append($(`<h1>${nome}</h1>`));
        let img = $("<img>");
        img.prop("src", logo);
        img.prop("height", "150");
        info.append(img);
        info.append($(`<p>Full Team Name: ${nomeCompleto}</p>`));
        info.append($(`<p>Country: ${paese}</p>`));
        info.append($(`<p>Chassis: ${chassis}</p>`));
        info.append($(`<p>Power Unit: ${pU}</p>`));
        info.append($(`<p>Technical Chief: ${techChief}</p>`));
        info.append($(`<p>Drivers: ${primoDriver}, ${secondDriver}</p>`));
        img = $("<img>");
        img.prop("src", foto);
        img.prop("height", "150");
        info.append(img);
    });
}

function creaTabellaCircuits(circuits) {
    let _table = $("<table>");
    for (let i = 0; i < circuits.length; i++) {
        let row = $("<tr>");
        for (let index in circuits[i]) {
            if (index == "recordLap")
                continue;
            let cell = $("<td>");
            if (index != "img") {
                if (index == "country")
                    cell.text(circuits[i][index]["countryName"]);
                else
                    cell.text(circuits[i][index]);
                row.append(cell);
            }
            else {
                let _img = $("<img>");
                _img.prop("src", circuits[i][index]);
                _img.prop("height", "50");
                row.append(_img);
            }
        }
        _table.append(row);
    }
    $("#wrapper").append(_table);
}

function richiesta(parameters, callbackFunction) {
    let _richiesta = $.ajax({
        url: "api" + parameters,
        type: "GET",
        data: "",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        timeout: 5000,
    });

    _richiesta.done(callbackFunction);
    _richiesta.fail(error);
}

function error(jqXHR, testStatus, strError) {
    $("#table thead").html("");
    $("#table tbody").html("Impossibile trovare la risorsa richiesta, maggiori informazioni in console.");
    if (jqXHR.status == 0)
        console.log("server timeout");
    else if (jqXHR.status == 200)
        console.log("Formato dei dati non corretto : " + jqXHR.responseText);
    else
        console.log("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
};