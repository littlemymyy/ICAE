import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="cosmetic"
)

def countCAS(cas):
    dd = []
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM chemical WHERE cas = '" + cas + "'")
    myresult = mycursor.fetchall()
    print(len(myresult))
    return len(myresult)

def getData():
    data = []
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM chemical WHERE st = 0")
    myresult = mycursor.fetchall()
    for x in myresult:
        data.append(x)
    print(len(data))
    waitForDelete = []
    for x in data:
        if countCAS(x[1]) > 1:
            if x[1] not in waitForDelete:
                waitForDelete.append(x[1])
                if countCAS(x[1]) > 5:
                    print(x[1])
                    break
    return waitForDelete

wait = getData()
print(len(wait))