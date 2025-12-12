kubectl run loadgen --image=busybox --restart=Never --   sh -c "while true; do wget -q -O- http://10.99.146.12:3000 >/dev/null; done"
