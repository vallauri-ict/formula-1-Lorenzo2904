let TableTeams = {
    template: `
        <table class="table is-fullwidth is-hoverable" v-if="teams.length > 0">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>FullTeamName</th>
                    <th>Country</th>
                    <th>Power unit</th>
                    <th>Technical chief</th>
                    <th>Chassis</th>
                    <th>First driver</th>
                    <th>Second driver</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in teams">
                    <td>{{item.ID}}</td>
                    <td>{{item.Name}}</td>
                    <td>{{item.FullTeamName}}</td>
                    <td>{{item.Country.CountryName}}</td>
                    <td>{{item.PowerUnit}}</td>
                    <td>{{item.TechnicalChief}}</td>
                    <td>{{item.Chassis}}</td>
                    <td>{{item.FirstDriver.Firstname}} {{item.FirstDriver.Lastname}}</td>
                    <td>{{item.SecondDriver.Firstname}} {{item.SecondDriver.Lastname}}</td>
                </tr>
            </tbody>
        </table>
    `,
    props: ['teams']
};