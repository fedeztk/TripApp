package com.TripApp.group.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.amqp.core.Queue;

@Configuration
public class RabbitMqConfig {
    String groupQueue = "groupQueue";
    String walletQueue = "walletQueue";

    String exchange = "deleteGroup";

    @Bean
    Queue groupQueue() {
        return new Queue(groupQueue, true);
    }

    @Bean
    Queue walletQueue() {
        return new Queue(walletQueue, true);
    }

    @Bean
    FanoutExchange exchange() {
        return new FanoutExchange(exchange);
    }

    @Bean
    Binding groupBinding(Queue groupQueue, FanoutExchange fanoutExchange) {
        return BindingBuilder.bind(groupQueue).to(fanoutExchange);
    }

    @Bean
    Binding walletBinding(Queue walletQueue, FanoutExchange fanoutExchange) {
        return BindingBuilder.bind(walletQueue).to(fanoutExchange);
    }
}
