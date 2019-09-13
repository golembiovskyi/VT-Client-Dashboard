$(document).ready(function () {
    $(document).on('DOMNodeInserted', function (e) {
        if ($(e.target).hasClass('orbit-gizmo')) {
            // to make sure we get the viewer, let's use the global var NOP_VIEWER
            if (NOP_VIEWER === null || NOP_VIEWER === undefined) return;
            new Dashboard(NOP_VIEWER, [
                new ClashStatus(),
                new CategoryChart(),
                new MaterialChart()
            ])
        }
    });
})

// Handles the Dashboard panels
class Dashboard {
    constructor(viewer, panels) {
        var _this = this;
        this._viewer = viewer;
        this._panels = panels;
        this.adjustLayout();
        this._viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, (viewer) => {
            _this.loadPanels();
        });
    }

    adjustLayout() {
        // this function may vary for layout to layout...
        // for learn forge tutorials, let's get the ROW and adjust the size of the 
        // columns so it can fit the new dashboard column, also we added a smooth transition css class for a better user experience
        //var row = $(".row").children();
        //$(row[2]).removeClass('col-sm-8').addClass('col-sm-8 transition-width').after('<div class="col-xs-6 col-sm 3 transition" id="dashboard"></div>');
    }

    loadPanels = function () {
        var _this = this;
        var data = new ModelData(this);
        data.init(function () {
            $('#dashboard').empty();
            _this._panels.forEach(function (panel) {
                // let's create a DIV with the Panel Function name and load it
                panel.load('dashboard', viewer, data);
            });
        });
    }
}

// Dashboard panel base
class DashboardPanel {
    load(parentDivId, divId, viewer) {
        this.divId = divId;
        this.viewer = viewer;
        $('#' + parentDivId).append('<div class="short-div" id="' + divId + '" class="dashboardPanel"></div>');
    }
}

// Dashboard panels for charts
class DashboardPanelChart extends DashboardPanel {
    load(parentDivId, divId, viewer, modelData) {
        super.load(parentDivId, divId, viewer);
        this.canvasId = divId + 'Canvas';
        $('#' + divId).append('<canvas id="' + this.canvasId + '" width="200" height="200"></canvas>');
        this.modelData = modelData;
    }
    generateColors(count) {
        var background = []; var borders = [];
        for (var i = 0; i < count; i++) {
            var r = Math.round(Math.random() * 255); var g = Math.round(Math.random() * 255); var b = Math.round(Math.random() * 255);
            background.push('rgba(' + r + ', ' + g + ', ' + b + ', 0.2)');
            borders.push('rgba(' + r + ', ' + g + ', ' + b + ', 0.2)');
        }
        return { background: background, borders: borders };
    }
}
