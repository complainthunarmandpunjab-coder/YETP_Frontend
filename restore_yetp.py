import subprocess
res = subprocess.run("git checkout src/data/yetp.ts", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
print("Code:", res.returncode)
