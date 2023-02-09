

package example;
        
     public class RequestClass {
        String id;
        String itemName;
        Number quantity;

        public String getId() {
            return id;
        }


        public void setId(String id) {
            this.id = id;
        }

        public String getItemName() {
            return itemName;
        }


        public void setItemName(String name) {
            this.itemName = itemName;
        }


        public Number getQuantity() {
            return quantity;
        }

        public void setQuantity(Number quantity) {
            this.quantity = quantity;
        }

      

        public RequestClass(String id,String itemName, Number quantity) {
            this.id=id;
            this.itemName = itemName;
            this.quantity = quantity;
        }

        public RequestClass() {
        }
    }