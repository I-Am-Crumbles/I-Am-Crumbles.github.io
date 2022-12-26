## **TCP Server and Client Python Scripts**

Using modules such as *Socket* and *Threading* I am able to build out a simple *TCP Server* and *Client* to test that servers response to a request.

---


<ins> **TCP Server Script** </ins>

```
#!/usr/bin/python3

# import modules
import socket
import threading
import sys

#Defines the ip address and port number as variables that are passed as parameters from the command line.
ip_addr = sys.argv[1]
port = int(sys.argv[2])

#Function that creates a new socket object using IPv4 (AF_INET) and socket type tcp (SOCK_STREAM)
def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    #Binds the socket to specified IP address and port number.
    server.bind((ip_addr, port))
    # Puts socket into listen mode allowing it to accept incoming requests and sets a maximum of 5 queued connections.
    server.listen(5)
    #prints a message to indicate that the server is listening 
    print(f'[*] Listening on {ip_addr} : {port}')
    
    #While loop that waits for client to connect to the server. When connections is accepted it returns a new socket object and the client's address
    while True:
        client, address = server.accept()
        #Print message to indicate the connection was accepted
        print(f'[*] Accepted connection from {address[0]}:{address[1]}')
        # Create a new thread and start it, with the "client" socket object passed as an argument to the hand_client function below
        client_handler = threading.Thread(target=handle_client, args=(client,))
        client_handler.start()
        
# Function that receives data from the client socket with a max buffer size of 1024bytes
def handle_client(client_socket):
    with client_socket as sock:
        request = sock.recv(1024)
        #Prints data that has been converted from bytes to a string.
        print(f'[*] Received: {request.decode("utf-8")}')
        # Sends the "ACK" message to the client socket in bytes format
        sock.send(b'ACK')
      
#Dunder check that specifies that the main fucntion should be called when the script is run.
if __name__ == '__main__':
    main()
```

---


<ins> **TCP Client Script** </ins>

```
#!/usr/bin/python3

#import modules
import socket
import sys

#assigns the target host ip address and port to variables passed as a parameter by the command line
target_host = sys.argv[1]
target_port = sys.argv[2]

# creating a ipv4 socket ojbect using AF_INET and setting it to tcp type using SOCK.STREAM
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# connecting to the cliet
client.connect((target_host,int(target_port)))

#send byte encoded GET request to the target
client.send(b"GET / HTTP/1.1\r\nHost: google.com\r\n\r\n")

#receive data from target host with max buffer of 4096 bytes
response = client.recv(4096)

#Decodes the received data from bytes to a string, prints it, then closes the socket connection.
print(response.decode())
client.close()

```

---


<ins> **Usage Example** </ins>

Both of these scripts are fed their parameters through the command line. First the *IP address* and then the *Port* the server is to be hosted on or the request be sent to respectively.

The scripts themselves can be seen here, *tcp_server.py* on the left and *tcp_client.py* on the right. 

![Scripts](/docs/assets/images/bhp/networkbasics/vimtcpserverandclient.png)

Using *IP Address 0.0.0.0* and *Port 4444* as examples it can be seen on the left that the server is started and begins listening, the client is then run on the right, then again on the left the server accepts the connection from my *host IP address* and recieves the *GET* request. 

The *server* then sends the *ACK* message to the *client* show me that the connection request was recieved and then the *client* closes itself.

![In Action](/docs/assets/images/bhp/networkbasics/success.png)

The *server* however will continue to run until the script is closed. Even then I found that the *port* associated with the *server* still had a *process* running in the background. This was easily remedied with a simple *command*.

`lsof -i :PORT`

\* Note the very easily missed colon before the *port number*

![close process](/docs/assets/images/bhp/networkbasics/closeportprocess.png)

---


<ins> **Final Thoughts** </ins>

Not a whole lot on this one. I plan to focus my studies a little more on *Python* and utilizing it as a tool for *Penetration Testing*. These are simple scripts that will probably be built out more as I pursue personal projects related to them.

