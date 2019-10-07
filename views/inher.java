class inher{
    public String name;
    public String people;

    public void people(){
        System.out.println(people + " " + name);
    }

    public static void main(String args[]){

        sibling p = new sibling();
        p.print();
    }
}

class sibling{
    inher in = new inher();
    in.name = "Korede";
    in.people = "humans";

    public void print(){
        System.out.println(in.people + " " +in.name);
    }

}