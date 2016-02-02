# http-stress

## Operation system constraints

Depending on your operation system you may need to tune it.

1. Adjust your maximum number of open file descriptors
```
ulimit -n 10240
```
2. Adjust your size of the listen queue for accepting new TCP connections
```
sysctl -a | grep somax
sudo sysctl -w kern.ipc.somaxconn=4096
```

## Instalation

## Unit tests

## Integration tests
