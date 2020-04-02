"use strict";

let TableDrivers = {
    template: `
        <table class="table is-fullwidth is-hoverable" v-if="drivers.length > 0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>DOB</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in drivers">
                    <td>{{item.ID}}</td>
                    <td>{{item.Firstname}}</td>
                    <td>{{item.Lastname}}</td>
                    <td>{{new Date(item.DOB)}}</td>
                    <td>{{item.Country.CountryName}}</td>
                </tr>
            </tbody>
        </table>
    `,
    props: ['drivers']
};