"use strict";

$(() => {
    $("#info").hide();
    $("#caricaDrivers").on("click", () => {
        $("#wrapper").empty();
        $("#info").hide();
        richiesta("/drivers/list", data => {
            creaTabellaDrivers(data);
        });
    });

    $("#caricaTeams").on("click", () => {
        $("#wrapper").empty();
        $("#info").hide();
        richiesta("/teams/list", data => {
            creaTabellaTeams(data);
        });
    });

    $("#caricaCircuits").on("click", () => {
        $("#wrapper").empty();
        $("#info").hide();
        richiesta("/circuits/list", data => {
            creaTabellaCircuits(data);
        });
    });
});

function creaTabellaDrivers(drivers)
{
    let color = "a";
    let _table = $("<table>");
    _table.prop("id", "tableData");
    let _thead = $("<thead>");
    _thead.append("<th>ID</th><th>Name</th><th>Surname</th><th>Country</th><th>Image</th><th>Infos</th>")
    _table.append(_thead);
    let _tbody = $("<tbody>");
    for (let i = 0; i < drivers.length; i++) {
        let row = $("<tr>");
        if (color == "a") {
            row.prop("style", "background-color: #fff8dc;");
            color = "b";
        }
        else {
            row.prop("style", "background-color: #fffaf0;");
            color = "a";
        }
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
                cell.append(_img);
                row.append(cell);
            }
        }
        let btnInfo = $(`<a href='#bannerMenu'><input type='button' onclick='visualizzaDriver(${drivers[i]["id"]})' value='Click here'></a>`);
        btnInfo.prop("style", "width: 150px; heigth: 30px;");
        let cell = $("<td>");
        cell.append(btnInfo);
        row.append(cell);
        _tbody.append(row);
    }
    _table.append(_tbody);
    $("#wrapper").append(_table);
}

function visualizzaDriver(id) {
    let info = $("#info");
    info.empty();
    info.show();
    richiesta(`/drivers/${id}`, data => {
        console.log(data);
        let nome = data["firstname"];
        let cognome = data["lastname"];
        let foto = data["img"];
        let dob = data["dob"];
        let pob = data["placeOfBirthday"];
        let desc = data["description"];
        let naz = data["country"]["countryName"];
        info.append($(`<h1 style="text-align: center;">${nome} ${cognome}</h1>`));
        let img = $("<img>");
        img.prop("src", foto);
        img.prop("height", "250");
        let div = $("<div>");
        div.prop("style", "text-align: center; margin-bottom: 10px;");
        div.append(img);
        info.append(div);
        let p = $(`<p style='text-align: center; margin-bottom: 5px;'><b>Date of Birth</b>: ${dob.split("T")[0]}, ${pob}</p>`);
        info.append(p);
        p = $(`<p style='text-align: center;'><b>Nazionality</b>: ${naz}</p>`);
        info.append(p);
        p = $(`<p><b>Description</b>: ${desc}</p>`);
        info.append(p);
    });
}

function creaTabellaTeams(teams) {
    let color = "a";
    let _table = $("<table>");
    _table.prop("id", "tableData");
    let _thead = $("<thead>");
    _thead.append("<th>ID</th><th>Brand</th><th>Country</th><th>Logo</th><th>Name</th><th>Surname</th><th>Image</th><th>Infos</th>")
    _table.append(_thead);
    let _tbody = $("<tbody>");
    for (let i = 0; i < teams.length; i++) {
        let row = $("<tr>");
        if (color == "a") {
            row.prop("style", "background-color: #fff8dc;");
            color = "b";
        }
        else {
            row.prop("style", "background-color: #fffaf0;");
            color = "a";
        }
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
                cell.append(_img);
                row.append(cell);
            }
        }
        let btnInfo = $(`<a href='#bannerMenu'><input type='button' onclick='visualizzaTeam(${teams[i]["id"]})' value='Click Here'></a>`);
        btnInfo.prop("style", "width: 150px; heigth: 30px;");
        let cell = $("<td>");
        cell.append(btnInfo);
        row.append(cell);
        _tbody.append(row);
    }
    _table.append(_tbody);
    $("#wrapper").append(_table);
}

function visualizzaTeam(id) {
    let info = $("#info");
    info.empty();
    info.show();
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

        info.append($(`<h1 style='text-align: center;'>${nome}</h1>`));
        let img = $("<img>");
        img.prop("src", logo);
        img.prop("height", "150");
        let div = $("<div style='text-align: center; margin-bottom: 20px;'>");
        div.append(img);
        info.append(div);
        info.append($(`<p style='text-align: center;'><b>Full Team Name</b>: ${nomeCompleto}</p>`));
        info.append($(`<p style='text-align: center;'><b>Country</b>: ${paese}</p>`));
        info.append($(`<p style='text-align: center;'><b>Chassis</b>: ${chassis}</p>`));
        info.append($(`<p style='text-align: center;'><b>Power Unit</b>: ${pU}</p>`));
        info.append($(`<p style='text-align: center;'><b>Technical Chief</b>: ${techChief}</p>`));
        info.append($(`<p style='text-align: center;'><b>Drivers</b>: ${primoDriver}, ${secondDriver}</p>`));
        img = $("<img>");
        img.prop("src", foto);
        img.prop("height", "150");
        div = $("<div style='text-align: center;'>");
        div.append(img);
        info.append(div);
    });
}

function creaTabellaCircuits(circuits) {
    let color = "a";
    let _table = $("<table>");
    _table.prop("id", "tableCircuits");
    let _thead = $("<thead>");
    _thead.append("<th>ID</th><th>Circuit Name</th><th>Lenght (m)</th><th>Laps</th><th>Country</th><th>Image</th>")
    _table.append(_thead);
    let _tbody = $("<tbody>");
    for (let i = 0; i < circuits.length; i++) {
        let row = $("<tr>");
        if (color == "a") {
            row.prop("style", "background-color: #fff8dc;");
            color = "b";
        }
        else {
            row.prop("style", "background-color: #fffaf0;");
            color = "a";
        }
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
                cell.append(_img);
                row.append(cell);
            }
        }
        _tbody.append(row);
    }
    _table.append(_tbody);
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