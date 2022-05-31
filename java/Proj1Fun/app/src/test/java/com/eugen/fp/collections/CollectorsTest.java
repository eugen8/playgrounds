package com.eugen.fp.collections;


import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

public class CollectorsTest {
//    https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#reduce-java.util.function.BinaryOperator-
//    On side-effects (Java9)
//    https://docs.oracle.com/javase/9/docs/api/java/util/stream/package-summary.html#SideEffects

    @Test public void simpleCollectTest() {
        List<Integer> elems = new ArrayList<>();
        elems.addAll(Arrays.asList(3,5,3,2,5,6,3));

        var newElems = elems.stream().collect( () -> new ArrayList<Integer>(), // Supplier of a collection object
                (col, i) -> col.add(i*2), // Accumulator, how to add element i to the collection col
                (cola, colb) -> cola.addAll(colb)
        );
        Assert.assertEquals(
                Arrays.asList(6, 10, 6, 4, 10, 12, 6),
                newElems);
    }

    @Test
    public void collectAsSum() {
        List<Integer> elems = new ArrayList<>();
        elems.addAll(Arrays.asList(3,5,3,2,5,6,3));

        var newElems = elems.stream().collect(
                () -> new Integer[]{0},
                (a, b) -> a[0] = a[0]+b,
                (a, b) -> a[0] = a[0] + b[0]
        );
        System.out.println(newElems[0]);
        Assert.assertEquals(Integer.valueOf(27), newElems[0]);
        Assert.assertEquals(
                elems.stream().collect(Collectors.summingInt(Integer::intValue)),
                newElems[0]
        );
    }

    @Test public void sumOtherProperty(){
        class Item {
            String name;
            Integer price;
            Item(String name, Integer price){
                this.name = name;
                this.price = price;
            }
        }
        var items = Arrays.asList(new Item("pencil", 32), new Item("question", 42));

        var total = items.stream().collect(Collectors.summingInt( it -> it.price));
        Assert.assertEquals(Integer.valueOf(74), total);
    }

    @Test public void reduceTest(){

        List<Integer> elems = new ArrayList<>();
        elems.addAll(Arrays.asList(3,5,3,2,5,6,3));

        var total = elems.stream().reduce(0, (a,b) -> a+b);
        Assert.assertEquals(Integer.valueOf(27), total);
    }

    @Test public void reduceWitOneParams() {
        List<Integer> elems = new ArrayList<>();
        elems.addAll(Arrays.asList(3,5,3,2,5,6,3));

        // Optional<Integer>
        var total = elems.stream().reduce( (a,b) -> a+b);
        Assert.assertTrue(total.isPresent());
        total.ifPresent(v ->
                Assert.assertEquals(Integer.valueOf(27), v));

    }
}
