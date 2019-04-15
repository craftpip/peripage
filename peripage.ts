export enum PeriPosition {
    left = 'l',
    right = 'r',
    center = 'c',
}

export interface PeriCell {
    startIndex?: number,
    endIndex?: number,
    width?: number,
    content: string,
    align: PeriPosition,
}

export class PeriPage {
    content: string = '';

    constructor(public pageWidth: number) {

    }

    /**
     * Parse the column's width
     * @param columns
     */
    parseColumns(columns: PeriCell[]) {
        // convert percent width to cell width

        let totalWidth = 0;
        for (let a of columns) {
            if (a.width) {
                a.width = Math.ceil(a.width * this.pageWidth / 100);
                totalWidth += a.width;
            }
        }
        if (totalWidth > this.pageWidth) {
            // overflow
            let overflow = totalWidth - this.pageWidth;
            columns[columns.length - 1].width -= overflow;
        }


        // calculate total space taken for one row,
        // and how many columns are width-less, will set their widths ourself.
        let spacesTaken = 0;
        let widthLessItems = 0;
        for (let a of columns) {
            if (a.width) {
                spacesTaken += a.width;
            } else {
                widthLessItems += 1;
            }
        }

        // remaining space after defined width
        let remainingSpace = this.pageWidth - spacesTaken;
        if (remainingSpace) {
            // if space remains, then add those in the width-less columns
            let width = Math.floor(remainingSpace / widthLessItems);
            let offsetWidth = remainingSpace % widthLessItems;
            for (let aIndx in columns) {
                if (!columns[aIndx].width) {
                    columns[aIndx].width = width;
                    if (columns.length - 1 == parseInt(aIndx)) {
                        // last item. add the offset
                        columns[aIndx].width += offsetWidth;
                    }
                }
            }
        }

        // set the start indx and end indx of columns
        let i = 0;
        for (let c of columns) {
            c.startIndex = i;
            i += (c.width - 0);
            c.endIndex = i - 1;
        }

        return columns;
    }

    /**
     * Add text
     * @param columns
     */
    addText(columns: PeriCell[]) {
        let rows = [];
        columns = this.parseColumns(columns);
        rows.push(columns);
        rows = this.wrapRow(rows);

        for (let r of rows) {
            let rowString = '';
            for (let c of r) {
                rowString += this.getFormattedText(c);
            }
            this.addLine(rowString);
        }
    }


    /**
     * Expand a single row to multiple lines if there is overflow,
     * That is WRAP the content of cells.
     * @param rows
     * @param indx
     */
    wrapRow(rows: PeriCell[][], indx: number = 0) {
        let columns = rows[indx];
        for (let colIndx in columns) {
            let column = columns[colIndx];

            if (column.content.length > column.width) {
                // get the overflow, but from the last space, do not break words. LATER

                // add the rest of the content in next row in the same index.
                // let s = column.content.substr(column.startIndex, column.width);
                // let s2 = s.lastIndexOf(' '); // what is the last indx.
                // if (s2 == -1) { // could not find last indx?
                //     s2 = column.endIndex;
                // }

                // wrap text, with whole words, do not cut words.

                let lineAr = column.content.split(' ');
                let currentWrapAr = [];
                let currentWrapLength = 0;
                let overflowWrapAr = [];

                for (let l of lineAr) {
                    if (currentWrapLength + l.length >= column.width) {
                        console.log(l.length, currentWrapLength, column.width, this.pageWidth, l);
                        overflowWrapAr.push(l);
                    } else {
                        currentWrapAr.push(l);
                        currentWrapLength += l.length + 1; // plus 1 for space after join
                    }
                }

                let currentWrap = currentWrapAr.join(' ');
                let wrapOverflow = overflowWrapAr.join(' ');
                // let currentWrap = column.content.substr(0, column.width).trim();
                // let wrapOverflow = column.content.substr(column.width).trim();

                // overwrite current column
                column.content = currentWrap;
                // put wrap overflow in next row


                if (typeof rows[indx + 1] === 'undefined') {
                    // next row does not exists, add it
                    let newColumns = <PeriCell[]>JSON.parse(JSON.stringify(rows[indx])); // create copy of the current row
                    newColumns = newColumns.map(a => {
                        // empty the content
                        a.content = '';
                        return a;
                    });
                    rows.push(newColumns);
                }

                rows[indx + 1][colIndx].content = wrapOverflow.trim();
            }

            this.log(column);
        }

        // now check if the next row exists, if it exists run loop over it as well.

        if (typeof rows[indx + 1] !== 'undefined') {
            // it exists.
            return this.wrapRow(rows, indx + 1);
        }

        return rows;
    }

    getFormattedText(line: PeriCell) {
        let str = line.content;
        let align = line.align;
        let width = line.width || this.pageWidth;

        if (!width)
            width = this.pageWidth;

        switch (align) {
            case PeriPosition.left:
                str = str + this._getFill(width - str.length);
                return str;
            case PeriPosition.center:
                let spaces = width - str.length;
                // if odd, then add the extra space on the right.
                let leftSpaces = Math.floor(spaces / 2);
                let rightSpaces = Math.floor(spaces / 2) + spaces % 2;
                return this._getFill(leftSpaces) + str + this._getFill(rightSpaces);
            case PeriPosition.right:
                str = this._getFill(width - str.length) + str;
                return str;
        }
    }

    /**
     * Log it out.
     * @param a
     */
    log(a) {
        console.log('Peri: ', a);
    }

    /**
     * Add horizontal lines
     * @param fillWith
     */
    addHorizontalLine(fillWith: string = '—') {
        let line = this._getFill(this.pageWidth, fillWith);
        this.addLine(line);
    }

    /**
     * Get filled strings of length and char
     * @param fillWidth
     * @param char
     * @private
     */
    _getFill(fillWidth: number, char: string = ' ') {
        let line = '';

        for (let i = 0; i < fillWidth; i++) {
            line += char;
        }

        return line;
    }

    /**
     * Adds a simple new line
     * @param a
     */
    addLine(a: string) {
        this.content += a + "\n";
    }

    /**
     * Returns the resulting output
     */
    output() {
        return this.content;
    }
}