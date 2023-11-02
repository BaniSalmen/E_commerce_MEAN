import { Component ,OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html'
})
export class ProductsSearchComponent implements OnInit {

  searchTerm: string = '';
  searchResults: Product[] = []; // Définissez le type comme un tableau de Product

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {}

  searchProducts() {
    if (this.searchTerm.trim() !== '') {
      // Appelez une méthode de votre service de produits pour effectuer la recherche
      this.productService.searchProducts(this.searchTerm).subscribe(
        (results: Product[]) => { // Précisez le type ici
          this.searchResults = results; // Stockez les résultats de la recherche dans searchResults
        },
        (error) => {
          console.error('Erreur lors de la recherche de produits :', error);
          // Gérez l'erreur si nécessaire
        }
      );
    }
  }
}