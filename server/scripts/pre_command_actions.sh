export CGO_ENABLED=0
GOROOT=''
go env > vm
while read -r line
do
if [[ "$line" =~ ^GOROOT.* ]];then
   GOROOT=$(echo "$line" | cut -d "'" -f2)
   break
fi
done < vm
rm -r vm
sed -i '/SIGTERM = Signal(0xf)/a\SIGUSR1 = Signal(16)\nSIGUSR2 = Signal(17)\nSIGTSTP = Signal(18)\nSIGSTOP = Signal(19)' ${GOROOT}/src/syscall/types_windows.go
sed -i '/15: "terminated",/a\16: "SIGUSR1",\n17: "SIGUSR2",\n18: "SIGTSTP",\n19: "SIGSTOP",' ${GOROOT}/src/syscall/types_windows.go
sed -i '$a\func Kill(...interface{}) error { return nil;}' ${GOROOT}/src/syscall/types_windows.go
