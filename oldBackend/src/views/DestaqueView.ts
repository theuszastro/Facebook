import highlighted from '../database/models/Highlighted';

class highlightedView {
   RenderMultipleDestaque(highlights: highlighted[]){
      return highlights.sort(this.SortCrescente);
   }

   private SortCrescente(a: highlighted, b: highlighted) {
      const ElementA = Number(a.order);
      const ElementB = Number(b.order);

      return ElementA - ElementB;
   }
}

export default new highlightedView;