"use strict";
var PeriPosition;
(function (PeriPosition) {
    PeriPosition["left"] = "l";
    PeriPosition["right"] = "r";
    PeriPosition["center"] = "c";
})(PeriPosition || (PeriPosition = {}));
var PeriPage = (function () {
    function PeriPage(pageWidth) {
        this.pageWidth = pageWidth;
        this.content = '';
    }
    PeriPage.prototype.parseColumns = function (columns) {
        var totalWidth = 0;
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var a = columns_1[_i];
            if (a.width) {
                a.width = Math.ceil(a.width * this.pageWidth / 100);
                totalWidth += a.width;
            }
        }
        if (totalWidth > this.pageWidth) {
            var overflow = totalWidth - this.pageWidth;
            columns[columns.length - 1].width -= overflow;
        }
        var spacesTaken = 0;
        var widthLessItems = 0;
        for (var _a = 0, columns_2 = columns; _a < columns_2.length; _a++) {
            var a = columns_2[_a];
            if (a.width) {
                spacesTaken += a.width;
            }
            else {
                widthLessItems += 1;
            }
        }
        var remainingSpace = this.pageWidth - spacesTaken;
        if (remainingSpace) {
            var width = Math.floor(remainingSpace / widthLessItems);
            var offsetWidth = remainingSpace % widthLessItems;
            for (var aIndx in columns) {
                if (!columns[aIndx].width) {
                    columns[aIndx].width = width;
                    if (columns.length - 1 == parseInt(aIndx)) {
                        columns[aIndx].width += offsetWidth;
                    }
                }
            }
        }
        var i = 0;
        for (var _b = 0, columns_3 = columns; _b < columns_3.length; _b++) {
            var c = columns_3[_b];
            c.startIndex = i;
            i += (c.width);
            c.endIndex = i - 1;
        }
        return columns;
    };
    PeriPage.prototype.addText = function (columns) {
        var rows = [];
        columns = this.parseColumns(columns);
        rows.push(columns);
        rows = this.wrapRow(rows);
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var r = rows_1[_i];
            var rowString = '';
            for (var _a = 0, r_1 = r; _a < r_1.length; _a++) {
                var c = r_1[_a];
                rowString += this.getFormattedText(c);
            }
            this.addLine(rowString);
        }
    };
    PeriPage.prototype.wrapRow = function (rows, indx) {
        if (indx === void 0) { indx = 0; }
        var columns = rows[indx];
        for (var colIndx in columns) {
            var column = columns[colIndx];
            if (column.content.length > column.width) {
                var lineAr = column.content.split(' ');
                var currentWrapAr = [];
                var currentWrapLength = 0;
                var overflowWrapAr = [];
                for (var _i = 0, lineAr_1 = lineAr; _i < lineAr_1.length; _i++) {
                    var l = lineAr_1[_i];
                    if (currentWrapLength + l.length >= column.width) {
                        overflowWrapAr.push(l);
                    }
                    else {
                        currentWrapAr.push(l);
                        currentWrapLength += l.length + 1;
                    }
                }
                var currentWrap = currentWrapAr.join(' ');
                var wrapOverflow = overflowWrapAr.join(' ');
                column.content = currentWrap;
                if (typeof rows[indx + 1] === 'undefined') {
                    var newColumns = JSON.parse(JSON.stringify(rows[indx]));
                    newColumns = newColumns.map(function (a) {
                        a.content = '';
                        return a;
                    });
                    rows.push(newColumns);
                }
                rows[indx + 1][colIndx].content = wrapOverflow.trim();
            }
        }
        if (typeof rows[indx + 1] !== 'undefined') {
            return this.wrapRow(rows, indx + 1);
        }
        return rows;
    };
    PeriPage.prototype.getFormattedText = function (line) {
        var str = line.content;
        var align = line.align;
        var width = line.width || this.pageWidth;
        if (!width)
            width = this.pageWidth;
        switch (align) {
            case PeriPosition.left:
                str = str + this._getFill(width - str.length);
                return str;
            case PeriPosition.center:
                var spaces = width - str.length;
                var leftSpaces = Math.floor(spaces / 2);
                var rightSpaces = Math.floor(spaces / 2) + spaces % 2;
                return this._getFill(leftSpaces) + str + this._getFill(rightSpaces);
            case PeriPosition.right:
                str = this._getFill(width - str.length) + str;
                return str;
        }
    };
    PeriPage.prototype.log = function (a) {
        console.log('Peri: ', a);
    };
    PeriPage.prototype.addHorizontalLine = function (fillWith) {
        if (fillWith === void 0) { fillWith = '—'; }
        var line = this._getFill(this.pageWidth, fillWith);
        this.addLine(line);
    };
    PeriPage.prototype._getFill = function (fillWidth, char) {
        if (char === void 0) { char = ' '; }
        var line = '';
        for (var i = 0; i < fillWidth; i++) {
            line += char;
        }
        return line;
    };
    PeriPage.prototype.addLine = function (a) {
        this.content += a + "\n";
    };
    PeriPage.prototype.output = function () {
        return this.content;
    };
    return PeriPage;
}());
//# sourceMappingURL=peripage.js.map