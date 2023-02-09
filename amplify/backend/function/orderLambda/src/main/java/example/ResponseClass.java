

package example;
        
     public class ResponseClass {
       String id;
        String itemName;
        int quantity;

        public ResponseClass() {
        }
        public ResponseClass(String id, String itemName, int quantity) {
            this.id = id;
            this.itemName = itemName;
            this.quantity = quantity;
        }
        public String getId() {
            return id;
        }
        public void setId(String id) {
            this.id = id;
        }
        public String getItemName() {
            return itemName;
        }
        public void setItemName(String itemName) {
            this.itemName = itemName;
        }
        public int getQuantity() {
            return quantity;
        }
        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
        
    }