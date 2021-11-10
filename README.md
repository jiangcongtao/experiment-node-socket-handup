# Experiment with cases of network failure


## Use the black hole server `blackhole.webpagetest.org (72.66.115.13)`

All traffic heading to the black hole server will be dropped.
```
$ dig example.com @72.66.115.13

; <<>> DiG 9.10.3-P4-Debian <<>> example.com @72.66.115.13
;; global options: +cmd
;; connection timed out; no servers could be reached

% curl --connect-timeout 10  -v http://72.66.115.13/portal/index.html
*   Trying 72.66.115.13...
* TCP_NODELAY set
* Connection timed out after 10001 milliseconds
* Closing connection 0
curl: (28) Connection timed out after 10001 milliseconds
```

## Drop packets using IPTABLES
All outlook going DNS resolution traffic will be dropped
```
# iptables -I OUTPUT -p udp -d <iIP of DNS server> --dport 53 -j DROP
```

## Use throttling feature in Web Debugging Proxy Application (like Charles)
- [https://www.charlesproxy.com/documentation/proxying/throttling/](https://www.charlesproxy.com/documentation/proxying/throttling/)


## Reference

- https://www.cnblogs.com/tiechui2015/p/10773271.html
