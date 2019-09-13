class ClashStatus extends DashboardPanelChart {
    load(parentDivId, viewer, modelData) {
        super.load(parentDivId, this.constructor.name, viewer, modelData);
        this.propertyToUse = 'clashStatusReport';
        this.drawChart();
    }

    drawChart = async () => {
        let items = null;
        await getClashStatusData(function (output) {
            items = output;
        });

        const _this = this; // need this for the onClick event

        const ctx = document.getElementById(this.canvasId).getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                //labels: this.modelData.getLabels(this.propertyToUse).map((item, index) => `Clash Test ${index + 1}`),
                labels: items.map((item, index) => `Clash Test ${index + 1}`),
                datasets: [{
                    label: 'Open',
                    //data: this.modelData.getCountStatus(this.propertyToUse, 'Open'),
                    data: items.map(item => item['Open']),
                    backgroundColor: '#EBCCD1',
                    borderWidth: 1
                },
                {
                    label: 'Closed',
                    //data: this.modelData.getCountStatus(this.propertyToUse, 'Closed'),
                    data: items.map(item => item['Closed']),
                    backgroundColor: '#D6E9C6',
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Clash History'
                },
                scales: {
                    xAxes: [{ stacked: true }],
                    yAxes: [{ stacked: true }]
                },
                legend: {
                    display: true,
                    position:'bottom'
                },
                'onClick': function (evt, item) {
                    _this.viewer.isolate(_this.modelData.getIds(_this.propertyToUse, item[0]._model.label));
                }
            }
        });
    };
}

async function getClashStatusData(handleData) {
    jQuery.ajax({
        url: '/api/forge/clashstatusdata',
        success: function (items) {
            handleData(items);
        },
        async: false
    });
}
