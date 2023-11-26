import openpyxl
import mysql.connector

def insertData(dd):
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="cosmetic"
    )
    mycursor = mydb.cursor()

    sql = "INSERT INTO chemical ( cas , cname , cmname , per , st ,  img , des ,  bodypart , color ) VALUES (%s, %s , %s , %s , %s , %s , %s, %s, %s)"
    
    val =  (dd[3] , dd[1] , dd[0] , 100 , 0 , "-" , dd[2] , "-" , "-")
    mycursor.execute(sql, val)
    mydb.commit()
    print(mycursor.rowcount, "record inserted.")

def getdata() : 
    dataframe = openpyxl.load_workbook("C:/Users/praph/Desktop/A03/server/cosing_active_data.xlsx")
    dataframe1 = dataframe["Sheet1"]
    data = []
    data1 = []
    i = 0
    for row in dataframe1.iter_rows(values_only=True) : 
        if i > 0 :
            row = list(row)
            if row[23] != None:
                if row[0] is None:
                    row[0] = '-'
                if row[21] is None:
                    row[21] = '-'
                if row[12] is None:
                    row[12] = '-'
                # a = [row[0], row[21], row[12], row[23]]
                # data.append(a)
                if row[16] is None:
                    a = [row[0], row[21], row[12], row[23]]
                    data.append(a)
        i += 1
    return data

data = getdata()
# # print(data[0])
# print(len(data), len(data1))
# for x in data :
#     insertData(x)