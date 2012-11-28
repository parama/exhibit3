/**
 * @fileOverview Instance of Exhibit.Exporter for Exhibit DVTABLE.
 * @author David Huynh
 * @author <a href="mailto:ryanlee@zepheira.com">Ryan Lee</a>
 */

/**
 * @namespace
 */
Exhibit.Exporter.ExhibitDVTABLE = {
    _mimeType: "application/dv",
    exporter: null
};

/**
 * @param {String} s
 * @returns {String}
 */
Exhibit.Exporter.ExhibitDVTABLE.wrap = function(s) {
    return "{\n" +
        "    \"items\": [\n" +
            s +
        "    ]\n" +
        "}\n";
};

/**
 * @param {String} s
 * @param {Boolean} first
 * @param {Boolean} last
 * @returns {String}
 */
Exhibit.Exporter.ExhibitDVTABLE.wrapOne = function(s, first, last) {
    return s + (last ? "" : ",")  +"\n";
};

/**
 * @param {String} itemID
 * @param {Object} o
 * @returns {String}
 * @depends DVTABLE
 */
Exhibit.Exporter.ExhibitDVTABLE.exportOne = function(itemID, o) {
    return o;
};

/**
 * @private
 */
Exhibit.Exporter.ExhibitDVTABLE._register = function() {
    Exhibit.Exporter.ExhibitDVTABLE.exporter = new Exhibit.Exporter(
        Exhibit.Exporter.ExhibitDVTABLE._mimeType,
        Exhibit._("%export.exhibitDVTABLEExporterLabel"),
        Exhibit.Exporter.ExhibitDVTABLE.wrap,
        Exhibit.Exporter.ExhibitDVTABLE.wrapOne,
        Exhibit.Exporter.ExhibitDVTABLE.exportOne
    );
};

$(document).one("registerExporters.exhibit",
                Exhibit.Exporter.ExhibitDVTABLE._register);
