package com.tripappspike.tripapp;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;

import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.*;

@Component
public class SecurityConfig extends ZuulFilter {
    @Value("${auth.url}")
    private String authUrl;

    @Override
    public String filterType() {
        return PRE_TYPE;
    }

    @Override
    public int filterOrder() {
        return 0;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public Object run() {
        // check if the user is authenticated by checking the access token inside
        // the request header and the userId inside the request body
        // if the user is not authenticated, then return 401
        // if the user is authenticated, then add the userId to the request header
        // and forward the request to the destination service
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();


        String accessToken = request.getHeader("Authorization");
        String userId = request.getHeader("userId");

        if (accessToken == null || !accessToken.startsWith("Bearer ") || !isUserAuthenticated(accessToken, userId)) {
            ctx.setResponseStatusCode(HttpStatus.UNAUTHORIZED.value());
            ctx.setSendZuulResponse(false);
        }

        return null;
    }

    private boolean isUserAuthenticated(String accessToken, String userId) {
        HttpStatus statusCode;

        try {
            RestTemplate restTemplate = new RestTemplate();

            // add the access token to the request header
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.AUTHORIZATION, accessToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(authUrl + userId, HttpMethod.GET, entity, String.class);

            statusCode = response.getStatusCode();
        } catch (Exception e) {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return statusCode == HttpStatus.OK;
    }
}
