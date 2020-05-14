import Printer from './node_modules/pdfmake/src/printer';
import { pack } from './tools';

class pdfmake {
  createPdf(docDefinition, options = {}) {
    options.progressCallback = this.progressCallback;
    options.tableLayouts = this.tableLayouts;

    let printer = new Printer(this.fonts);
    let doc = printer.createPdfKitDocument(docDefinition, options);

    return this._transformToDocument(doc);
  }

  setProgressCallback(callback) {
    this.progressCallback = callback;
  }

  addTableLayouts(tableLayouts) {
    this.tableLayouts = pack(this.tableLayouts, tableLayouts);
  }

  setTableLayouts(tableLayouts) {
    this.tableLayouts = tableLayouts;
  }

  clearTableLayouts() {
    this.tableLayouts = {};
  }

  addFonts(fonts) {
    this.fonts = pack(this.fonts, fonts);
  }

  setFonts(fonts) {
    this.fonts = fonts;
  }

  clearFonts() {
    this.fonts = {};
  }

  _transformToDocument(doc) {
    return doc;
  }

}

export default pdfmake;
