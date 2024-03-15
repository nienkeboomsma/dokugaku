#!/bin/bash

if [ ! -e /root/.initialized ] ; then
    
    echo "========================"
    echo "Initialising Ichiran cli"
    echo "========================"

    set -e
    sed -i "s/REPLACETHISSTRING/${POSTGRES_PASSWORD}/g" /root/quicklisp/local-projects/ichiran/settings.lisp
    sbcl --load "/root/quicklisp/setup.lisp" --non-interactive \
        --eval "(ql:quickload :ichiran)" \
        --eval "(ichiran/mnt:add-errata)" \
        --eval "(in-package :ichiran/all)" \
        --eval "(init-all-caches)" \
        --eval "(init-suffixes t)" \
        --eval "(postmodern:clear-connection-pool)" \
        --eval "(uiop:dump-image \"/root/ichiran.core\" :executable nil :compression t)"
        # if sbcl is not 2.2.6+, otherwise remove :compression t from the line above
    sbcl --core /root/ichiran.core --non-interactive --eval "(ql:quickload :ichiran/cli)" --eval "(ichiran/cli:build)"
    ln -s /root/quicklisp/local-projects/ichiran/ichiran-cli /usr/local/bin/ichiran-cli
    set +e
    touch /root/.initialized

fi

echo "============================="
echo "Ichiran cli fully initialised"
echo "============================="
